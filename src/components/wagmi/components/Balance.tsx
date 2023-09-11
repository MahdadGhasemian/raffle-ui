'use client'

import { Button, Stack, Typography } from '@mui/material'
import { useAccount, useBalance } from 'wagmi'

export function Balance() {
  return (
    <Stack direction='row' justifyContent='start' alignItems='center' spacing={2}>
      <Typography>موجودی:</Typography>
      <AccountBalance />
    </Stack>
  )
}

export function AccountBalance() {
  const { address } = useAccount()
  const { data, refetch } = useBalance({
    address,
    watch: true
  })

  return (
    <Typography>
      {data?.formatted}
      <Button onClick={() => refetch()}>به روزرسانی</Button>
    </Typography>
  )
}
