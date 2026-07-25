// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ChallengeEscrow {
    struct Challenge {
        address payable creator;
        address payable opponent;
        address payable winner;
        uint256 amountPerPlayer;
        uint256 unlocksAt;
        bool creatorJoined;
        bool opponentJoined;
        bool resolved;
        bool refunded;
    }

    uint256 public nextChallengeId;
    mapping(uint256 => Challenge) private challenges;

    function createChallenge(address payable opponent, uint256 lockDurationSeconds)
        external
        payable
        returns (uint256 challengeId)
    {
        require(opponent != address(0), "opponent required");
        require(opponent != msg.sender, "different opponent required");
        require(msg.value > 0, "stake required");
        require(lockDurationSeconds > 0, "duration required");

        challengeId = nextChallengeId++;

        challenges[challengeId] = Challenge({
            creator: payable(msg.sender),
            opponent: opponent,
            winner: payable(address(0)),
            amountPerPlayer: msg.value,
            unlocksAt: block.timestamp + lockDurationSeconds,
            creatorJoined: true,
            opponentJoined: false,
            resolved: false,
            refunded: false
        });
    }

    function joinChallenge(uint256 challengeId) external payable {
        Challenge storage challenge = challenges[challengeId];

        require(challenge.creator != address(0), "challenge missing");
        require(msg.sender == challenge.opponent, "only opponent can join");
        require(!challenge.opponentJoined, "already joined");
        require(!challenge.resolved && !challenge.refunded, "already closed");
        require(msg.value == challenge.amountPerPlayer, "wrong stake");

        challenge.opponentJoined = true;
    }

    function resolveChallenge(uint256 challengeId, address payable winner) external {
        Challenge storage challenge = challenges[challengeId];

        require(challenge.creator != address(0), "challenge missing");
        require(msg.sender == challenge.creator, "only creator can resolve");
        require(block.timestamp >= challenge.unlocksAt, "still locked");
        require(challenge.opponentJoined, "opponent not joined");
        require(!challenge.resolved && !challenge.refunded, "already closed");
        require(
            winner == challenge.creator || winner == challenge.opponent,
            "winner must be a participant"
        );

        challenge.resolved = true;
        challenge.winner = winner;

        uint256 payout = challenge.amountPerPlayer * 2;
        (bool success, ) = winner.call{value: payout}("");
        require(success, "winner payout failed");
    }

    function refundChallenge(uint256 challengeId) external {
        Challenge storage challenge = challenges[challengeId];

        require(challenge.creator != address(0), "challenge missing");
        require(
            msg.sender == challenge.creator || msg.sender == challenge.opponent,
            "only participant can refund"
        );
        require(block.timestamp >= challenge.unlocksAt, "still locked");
        require(!challenge.resolved && !challenge.refunded, "already closed");

        challenge.refunded = true;

        if (!challenge.opponentJoined) {
            (bool creatorRefunded, ) = challenge.creator.call{value: challenge.amountPerPlayer}("");
            require(creatorRefunded, "creator refund failed");
            return;
        }

        (bool creatorRefunded, ) = challenge.creator.call{value: challenge.amountPerPlayer}("");
        require(creatorRefunded, "creator refund failed");

        (bool opponentRefunded, ) = challenge.opponent.call{value: challenge.amountPerPlayer}("");
        require(opponentRefunded, "opponent refund failed");
    }

    function getChallenge(uint256 challengeId) external view returns (Challenge memory) {
        Challenge memory challenge = challenges[challengeId];
        require(challenge.creator != address(0), "challenge missing");
        return challenge;
    }
}
