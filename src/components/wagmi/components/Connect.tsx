'use client'

// ** MUI Imports
import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

// ** Redux Imports
import { store } from '@/redux/store'
import { toastSuccess } from '@/redux/slices/snackbarSlice'

// ** Wagmi Imports
import { BaseError } from 'viem'
import { useAccount, useConnect } from 'wagmi'
import { ConnectionsMap, UserRejectedMessage } from '../translate'

interface SimpleDialogProps {
  open: boolean
  onClose: () => void
}

function SimpleDialog(props: SimpleDialogProps) {
  // ** Props
  const { onClose, open } = props

  // ** Store
  const { dispatch } = store

  // ** Wagmi
  const { connector, isConnected } = useAccount()
  const { connect, error, connectors, isLoading, pendingConnector } = useConnect()

  // ** Functions
  const handleClose = () => {
    onClose()
  }

  const errorHandler = (error: BaseError) => {
    const translatedText = UserRejectedMessage.get(error.shortMessage)

    return translatedText !== undefined ? translatedText : error.shortMessage
  }

  useEffect(() => {
    if (isConnected) {
      handleClose()
      dispatch(toastSuccess('اتصال به کیف پول با موفقیت انجام شد.'))
    }
  }, [isConnected])

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>برای اتصال یکی از کیف های زیر را انتخاب کنید.</DialogTitle>
      <DialogContent>
        <Stack spacing={4}>
          {connectors
            .filter(x => x.ready && x.id !== connector?.id)
            .map(x => (
              <Button
                fullWidth
                size='large'
                variant='contained'
                color='primary'
                key={x.id}
                onClick={() => connect({ connector: x })}
              >
                {ConnectionsMap.get(x.name)}
                {isLoading && x.id === pendingConnector?.id && ' (درحال اتصال)'}
              </Button>
            ))}
        </Stack>
        {error && (
          <Typography
            color='error'
            sx={{
              textTransform: 'uppercase',
              mt: 4
            }}
          >
            {errorHandler(error as BaseError)}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function Connect() {
  // ** States
  const [open, setOpen] = useState(false)

  // ** Wagmi
  const { isConnected } = useAccount()

  // ** Functions
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <SimpleDialog open={open} onClose={handleClose} />

      <div>
        {!isConnected && (
          <Button variant='outlined' color='primary' onClick={handleOpen}>
            اتصال به کیف پول
          </Button>
        )}
      </div>
    </div>
  )
}
