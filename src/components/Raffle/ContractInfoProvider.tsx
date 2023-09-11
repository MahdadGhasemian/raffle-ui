import React, { ReactNode, FC } from 'react'
import { Typography } from '@mui/material'
import { useNetwork } from 'wagmi'

type ContractAddressType = {
  chainId: number
  networkName: string
  networkName2: string
  contractAddress: string
}

interface ContractInfoProviderProps {
  children: (contractData: { address: `0x${string}`; abi: any }) => ReactNode
}

export type ContractDataType = {
  address: `0x${string}`
  abi: any
}

// ** Contract Data
import ContractAddresses from '@/constants/contractAddresses.json'
import ABI from '@/constants/abi.json'

const ContractInfoProvider: FC<ContractInfoProviderProps> = ({ children }) => {
  const contractAddresses = ContractAddresses as Array<ContractAddressType>

  const { chain } = useNetwork()
  console.log({ chain })
  const networkName = chain?.name.toLowerCase()
  const contractInfo = contractAddresses.find(
    data => data.networkName === networkName || data.networkName2 === networkName
  )
  const contractAddress = contractInfo?.contractAddress

  if (!contractAddress) return <Typography>آدرس قرارداد هوشمند پیدا نشد!</Typography>

  const contractData: ContractDataType = {
    address: contractAddress as `0x${string}`,
    abi: ABI
  }

  console.log({ contractData })

  return <>{children(contractData)}</>
}

export default ContractInfoProvider
