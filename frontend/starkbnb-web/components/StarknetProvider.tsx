'use client'

import { sepolia, mainnet } from '@starknet-react/chains'
import { 
    StarknetConfig, 
    publicProvider,
    argent,
    braavos,
    useInjectedConnectors,
    voyager,
    jsonRpcProvider,
    // injected
} from '@starknet-react/core'
import { InjectedConnector } from "starknetkit/injected";
// import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import { kakarotConnectors } from "@starknet-react/kakarot";
import { OKXSVG } from '../public/okx-svg'

export function StarknetProvider({
    children}: {children: 
        React.ReactNode}) {

    const provider = publicProvider()
    const { connectors: injected } = useInjectedConnectors({
        recommended: [argent(), braavos(), ...kakarotConnectors(provider)],
        includeRecommended: 'always',
        order: 'alphabetical',
    })

    const connectors = [
        ...injected,
        new InjectedConnector({options: {id: "okxwallet", name: "OKX Wallet", icon: OKXSVG}}),
        new WebWalletConnector({ url: "https://web.argent.xyz"}),
        // new ArgentMobileConnector(),
    ]

    return (
        <StarknetConfig
            chains={[mainnet, sepolia]}
            provider={jsonRpcProvider({
                rpc: (chain) => ({ nodeUrl: process.env.NEXT_PUBLIC_RPC_URL })
            }) || publicProvider()}
            // @ts-expect-error connectors array has been combined with injectedConnector and WebWalletConnector, and its type has been compromised
            connectors={connectors}
            explorer={voyager}
        >
            {children}
        </StarknetConfig>
    )
}