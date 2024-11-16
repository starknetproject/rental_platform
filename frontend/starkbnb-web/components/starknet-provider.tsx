'use client'

import { sepolia, mainnet } from '@starknet-react/chains'
import { 
    StarknetConfig, 
    publicProvider,
    argent,
    braavos,
    useInjectedConnectors,
    voyager
} from '@starknet-react/core'
import React from 'react'

export function StarknetProvider({
    children}: {children: 
        React.ReactNode}) {
    const { connectors } = useInjectedConnectors({
        recommended: [argent(), braavos()]
    })

    return (
        <StarknetConfig
            chains={[mainnet, sepolia]}
            provider={publicProvider()}
            connectors={connectors}
            explorer={voyager}
        >
            {children}
        </StarknetConfig>
    )
}