import {
  decodeFunctionResult,
  encodeFunctionData,
  formatEther,
  getAddress,
  isAddress,
  parseEther,
} from "viem";

export const challengeEscrowAbi = [
  {
    type: "function",
    name: "createChallenge",
    stateMutability: "payable",
    inputs: [
      { name: "opponent", type: "address" },
      { name: "lockDurationSeconds", type: "uint256" },
    ],
    outputs: [{ name: "challengeId", type: "uint256" }],
  },
  {
    type: "function",
    name: "joinChallenge",
    stateMutability: "payable",
    inputs: [{ name: "challengeId", type: "uint256" }],
    outputs: [],
  },
  {
    type: "function",
    name: "resolveChallenge",
    stateMutability: "nonpayable",
    inputs: [
      { name: "challengeId", type: "uint256" },
      { name: "winner", type: "address" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "refundChallenge",
    stateMutability: "nonpayable",
    inputs: [{ name: "challengeId", type: "uint256" }],
    outputs: [],
  },
  {
    type: "function",
    name: "getChallenge",
    stateMutability: "view",
    inputs: [{ name: "challengeId", type: "uint256" }],
    outputs: [
      {
        type: "tuple",
        components: [
          { name: "creator", type: "address" },
          { name: "opponent", type: "address" },
          { name: "winner", type: "address" },
          { name: "amountPerPlayer", type: "uint256" },
          { name: "unlocksAt", type: "uint256" },
          { name: "creatorJoined", type: "bool" },
          { name: "opponentJoined", type: "bool" },
          { name: "resolved", type: "bool" },
          { name: "refunded", type: "bool" },
        ],
      },
    ],
  },
] as const;

export type EscrowChallenge = {
  creator: `0x${string}`;
  opponent: `0x${string}`;
  winner: `0x${string}`;
  amountPerPlayer: bigint;
  unlocksAt: bigint;
  creatorJoined: boolean;
  opponentJoined: boolean;
  resolved: boolean;
  refunded: boolean;
};

const zeroAddress = "0x0000000000000000000000000000000000000000";
export const weekInSeconds = 7 * 24 * 60 * 60;

export function getChallengeEscrowAddress() {
  const address = process.env.NEXT_PUBLIC_CHALLENGE_ESCROW_ADDRESS;
  return address && isAddress(address) ? getAddress(address) : null;
}

export function sanitizeAddress(address: string) {
  return isAddress(address) ? getAddress(address) : null;
}

export function buildCreateChallengeData(opponent: string, durationWeeks: number) {
  return encodeFunctionData({
    abi: challengeEscrowAbi,
    functionName: "createChallenge",
    args: [getAddress(opponent), BigInt(durationWeeks * weekInSeconds)],
  });
}

export function buildJoinChallengeData(challengeId: bigint) {
  return encodeFunctionData({
    abi: challengeEscrowAbi,
    functionName: "joinChallenge",
    args: [challengeId],
  });
}

export function buildResolveChallengeData(challengeId: bigint, winner: string) {
  return encodeFunctionData({
    abi: challengeEscrowAbi,
    functionName: "resolveChallenge",
    args: [challengeId, getAddress(winner)],
  });
}

export function buildRefundChallengeData(challengeId: bigint) {
  return encodeFunctionData({
    abi: challengeEscrowAbi,
    functionName: "refundChallenge",
    args: [challengeId],
  });
}

export function buildGetChallengeData(challengeId: bigint) {
  return encodeFunctionData({
    abi: challengeEscrowAbi,
    functionName: "getChallenge",
    args: [challengeId],
  });
}

export function decodeChallengeResult(result: `0x${string}`) {
  return decodeFunctionResult({
    abi: challengeEscrowAbi,
    functionName: "getChallenge",
    data: result,
  }) as EscrowChallenge;
}

export function parseEthAmount(amount: string) {
  return parseEther(amount);
}

export function formatEthAmount(amount: bigint) {
  return formatEther(amount);
}

export function isZeroAddress(address: string) {
  return address.toLowerCase() === zeroAddress;
}
