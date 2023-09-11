import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface SettingState {
  tax_rate_default: number
  discount_percentage_default: number
}

const initialState: SettingState = {
  tax_rate_default: 0,
  discount_percentage_default: 0
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setSetting: (state, action: PayloadAction<string>) => {
      Object.assign(state, action.payload)
    }
  }
})

export const { setSetting } = settingSlice.actions

export const selectSetting = (state: RootState) => state.setting

export default settingSlice.reducer
