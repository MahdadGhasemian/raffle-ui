import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export enum MessageType {
  Default = 'default',
  NewOrder = 'new_order',
  NewPayment = 'new_payment',
  NewDelivery = 'new_delivery',
  NewBoard = 'new_board',
  EditBoard = 'edit_board'
}

export interface IMessage {
  id: number
  is_viewed: boolean
  type: MessageType
  title: string
  body: string
  data: string | any
  created_at: Date
  updated_at: Date
}

export interface MessageState {
  messages: IMessage[]
  unread: number
}

const initialState: MessageState = {
  messages: [],
  unread: 0
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.unread = action.payload
    },

    setMessages: (state, action: PayloadAction<Array<IMessage>>) => {
      state.messages = action.payload
    },

    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.unshift(action.payload)
      state.unread += 1
    },

    removeMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages = state.messages.filter(message => message.id !== action.payload.id)
      state.unread -= 1
    },

    clearMessages: state => {
      Object.assign(state.messages, [])
    }
  }
})

export const { setCount, setMessages, addMessage, removeMessage, clearMessages } = messageSlice.actions

export const selectMessages = (state: RootState) => state.message?.messages
export const selectUnreadCount = (state: RootState) => state.message?.unread

export default messageSlice.reducer
