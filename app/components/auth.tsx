import { PrivyInterface, usePrivy } from '@privy-io/react-auth';

import { useState } from 'react';
import { useLoginWithEmail } from '@privy-io/react-auth';

// incomplete add wallet login method.

export default function LoginWithEmail() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const { sendCode, loginWithCode } = useLoginWithEmail();

    if (true) {
        return (
            <div>
                <input onChange={(e) => setEmail(e.currentTarget.value)} value={email} />
                <button onClick={(_e) => sendCode({ email })}>Send Code</button>
                <input onChange={(e) => setCode(e.currentTarget.value)} value={code} />
                <button onClick={(_e) => loginWithCode({ code })}>Login</button>
            </div>
        );
    }
}
