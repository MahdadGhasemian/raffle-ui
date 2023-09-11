import { configureChains, createConfig } from 'wagmi'
import { hardhat, localhost, sepolia, mainnet } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'

const alchemyApiKey = String(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
const walletConnectProjectId = String(process.env.NEXT_PUBLIC_WALLET_CONNECT_CLOUD_PROJECT_ID)

const getRpc = (chain: { network: string }) => {
  return {
    http:
      chain.network === 'localhost'
        ? `http://127.0.0.1:7545`
        : chain.network === 'hardhat'
        ? `http://127.0.0.1:8545`
        : ''
  }
}

const chainsToUse = [mainnet, ...(process.env.NODE_ENV === 'development' ? [hardhat, localhost, sepolia] : [sepolia])]

const providersToUse = [
  alchemyProvider({ apiKey: alchemyApiKey }),
  ...(process.env.NODE_ENV === 'development' ? [jsonRpcProvider({ rpc: getRpc })] : [])
]

//@ts-ignore
const { chains, publicClient, webSocketPublicClient } = configureChains(chainsToUse, providersToUse)

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'raffle'
      }
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: walletConnectProjectId
      }
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true
      }
    })
  ],
  publicClient,
  webSocketPublicClient
})
