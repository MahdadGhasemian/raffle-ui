// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { Button, Stack } from '@mui/material'

// ** Wagmi Imports
import { useContractRead } from 'wagmi'

// ** Contract Data
import { ContractDataType } from './ContractInfoProvider'

//
interface Props {
  contractData: ContractDataType
}

const NumberOfPlayers = (props: Props) => {
  // ** Props
  const { contractData } = props

  // ** States
  const [totlaPlayers, setTotlaPlayers] = useState(String)

  const { isRefetching, refetch } = useContractRead({
    ...contractData,
    functionName: 'getNumberOfPlayers',
    onSuccess(data) {
      setTotlaPlayers(data.toString())
    }
  })

  return (
    <Stack direction='row' justifyContent='start' alignItems='center' spacing={2}>
      تعداد شرکت کنندگان: {totlaPlayers} نفر
      <Button disabled={isRefetching} onClick={() => refetch()} style={{ marginLeft: 4 }}>
        {isRefetching ? 'درحال بارگیری ...' : 'به روزرسانی'}
      </Button>
    </Stack>
  )
}

export default NumberOfPlayers
