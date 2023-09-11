// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { Box, Button, Typography } from '@mui/material'

// ** Redux Imports
import { store } from '@/redux/store'
import { toastSuccess } from '@/redux/slices/snackbarSlice'

// ** Wagmi Imports
import { useAccount, useContractRead, useContractWrite } from 'wagmi'

// ** Contract Data
import { ContractDataType } from './ContractInfoProvider'
import { formatEther, parseEther } from 'viem'

//
interface Props {
  contractData: ContractDataType
}

const EnterRaffle = (props: Props) => {
  // ** Props
  const { contractData } = props

  // ** States
  const [entranceFee, setEntranceFee] = useState(String)

  // ** Store
  const { dispatch } = store

  const { address } = useAccount()

  useContractRead({
    ...contractData,
    functionName: 'getEntranceFee',
    onSuccess(data) {
      setEntranceFee(formatEther(data as unknown as bigint))
    }
  })

  const { isLoading, write } = useContractWrite({
    ...contractData,
    functionName: 'enterRaffle',
    onSuccess(data) {
      dispatch(toastSuccess('انقال با موفقیت انجام شد.'))
      dispatch(toastSuccess(JSON.stringify(data)))
    }
  })

  if (!entranceFee)
    return (
      <Box>
        <Typography>در حال خواندن مبلغ ورودی</Typography>
      </Box>
    )

  return (
    <Box>
      <Button
        variant='contained'
        color='info'
        onClick={() =>
          write({
            // @ts-ignore
            from: address,
            value: parseEther(entranceFee)
          })
        }
      >
        {isLoading ? 'درحال آماده سازی ...' : 'شرکت کنید'}
      </Button>
    </Box>
  )
}

export default EnterRaffle
