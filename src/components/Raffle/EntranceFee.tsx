// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { Button, Stack } from '@mui/material'

// ** Wagmi Imports
import { useContractRead } from 'wagmi'

// ** Contract Data
import { ContractDataType } from './ContractInfoProvider'
import { formatEther } from 'viem'

interface Props {
  contractData: ContractDataType
}

const EntranceFee = (props: Props) => {
  // ** Props
  const { contractData } = props

  // ** States
  const [entranceFee, setEntranceFee] = useState(String)

  const { isRefetching, refetch } = useContractRead({
    ...contractData,
    functionName: 'getEntranceFee',
    onSuccess(data) {
      setEntranceFee(formatEther(data as unknown as bigint))
    }
  })

  return (
    <Stack direction='row' justifyContent='start' alignItems='center' spacing={2}>
      مبلغ ورودی: {entranceFee} ETH
      <Button disabled={isRefetching} onClick={() => refetch()} style={{ marginLeft: 4 }}>
        {isRefetching ? 'درحال بارگیری ...' : 'به روزرسانی'}
      </Button>
    </Stack>
  )
}

export default EntranceFee
