// ** MUI Imports
import { Grid } from '@mui/material'

// ** Wagmi
import { Connect } from '@/components/wagmi/components/Connect'
import { Connected } from '@/components/wagmi/components/Connected'
import { Balance } from '@/components/wagmi/components/Balance'

// ** Raffle Contract
import Entrance from '@/components/Raffle/Entrance'

const Dashboard = () => {
  return (
    <div>
      <Connect />
      <Connected>
        <Grid container spacing={4} marginY={4}>
          <Grid item xs={12}>
            <Balance />
          </Grid>
          <Grid item xs={12}>
            <Entrance />
          </Grid>
        </Grid>
      </Connected>
    </div>
  )
}

export default Dashboard
