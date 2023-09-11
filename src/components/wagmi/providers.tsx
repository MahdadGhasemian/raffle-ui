'use client'

// ** React Imports
import React from 'react'

// ** Wagmi Imports
import { WagmiConfig } from 'wagmi'
import { config } from './wagmi'

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  return <WagmiConfig config={config}>{mounted && children}</WagmiConfig>
}
