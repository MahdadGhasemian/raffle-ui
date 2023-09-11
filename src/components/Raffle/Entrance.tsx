// ** MUI Imports
import { Grid, Stack } from '@mui/material'

// ** Contract Data
import ContractInfoProvider from './ContractInfoProvider'

// ** Components Import
import EntranceFee from '@/components/Raffle/EntranceFee'
import EnterRaffle from '@/components/Raffle/EnterRaffle'
import NumberOfPlayers from '@/components/Raffle/NumberOfPlayers'
import RecentWinner from '@/components/Raffle/RecentWinner'

const Entrance = () => {
  return (
    <ContractInfoProvider>
      {contractData => {
        return (
          <Grid container spacing={4} marginY={4}>
            <Grid item xs={12}>
              <Stack direction='row' justifyContent='start' alignItems='center' spacing={2}>
                <EntranceFee contractData={contractData} />
                <EnterRaffle contractData={contractData} />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction='row' justifyContent='start' alignItems='center' spacing={2}>
                <NumberOfPlayers contractData={contractData} />
                <RecentWinner contractData={contractData} />
              </Stack>
            </Grid>
          </Grid>
        )
      }}
    </ContractInfoProvider>
  )
}

export default Entrance
