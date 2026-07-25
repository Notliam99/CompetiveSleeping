"use client";

import { PrivyProvider, PrivyInterface, usePrivy } from "@privy-io/react-auth";
import Auth from "./auth"

export function PrivyProviders({ children }: { children: React.ReactNode }) {
    return (
        <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
        >

            <LoginRedirect children={children} />
        </PrivyProvider>
    );
}

function LoginRedirect({ children }: { children: React.ReactNode }) {
    const privy_info: PrivyInterface = usePrivy();
    console.log(privy_info.authenticated)

    if (privy_info.ready) {
        if (!privy_info.authenticated) {
            return <Auth />
        } else {
            return children
        }
    }
    return (<p>loading...</p>)
}
