// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { Button, MenuItem } from '@mui/material'

// ** Wagmi Imports
import { useAccount, useDisconnect } from 'wagmi'
import { ConnectionsMap } from '@/components/wagmi/translate'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()

  // ** Wagmi
  const { connector, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = async (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          onClick={handleDropdownOpen}
          sx={{ width: '2.5rem', height: '2.5rem' }}
          imgProps={{ crossOrigin: 'anonymous' }}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar sx={{ width: '2.5rem', height: '2.5rem' }} imgProps={{ crossOrigin: 'anonymous' }} />
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}></Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}></Typography>
            </Box>
          </Box>
        </Box>

        {isConnected && (
          <MenuItem sx={{ py: 2 }} onClick={() => handleDropdownClose()}>
            <Button variant='contained' color='success' onClick={() => disconnect()}>
              قطع از کیف پول {connector?.name && ConnectionsMap.get(connector.name)}
            </Button>
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
