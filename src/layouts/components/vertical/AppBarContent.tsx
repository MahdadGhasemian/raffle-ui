// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Type Import
import { Settings } from '@/context/settingsContext'

// ** Components
import ModeToggler from '@/layouts/components/shared-components/ModeToggler'
import UserDropdown from '@/layouts/components/shared-components/UserDropdown'

// ** Redux Imports
import { Hidden, Stack, Typography } from '@mui/material'

// ** Import libraries
import moment from 'moment-jalaali'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}
        {!hiddenSm && (
          <TextField
            size='small'
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify fontSize='small' />
                </InputAdornment>
              )
            }}
          />
        )}
        <Stack sx={{ marginX: 10 }} direction='row' spacing={2}>
          <Hidden smDown>
            <Typography>امروز :‌ </Typography>
          </Hidden>
          <Typography>{moment().format('jYYYY/jMM/jDD')}</Typography>
        </Stack>
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {hiddenSm ? null : <Box></Box>}

        <span>
          <Hidden smDown>
            <ModeToggler settings={settings} saveSettings={saveSettings} />
          </Hidden>
          {/* <ThemColorSelect settings={settings} saveSettings={saveSettings} /> */}
          <UserDropdown />
        </span>
      </Box>
    </Box>
  )
}

export default AppBarContent
