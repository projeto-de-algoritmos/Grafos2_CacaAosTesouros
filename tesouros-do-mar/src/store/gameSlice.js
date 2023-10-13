import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  treasurePosition: null,
  piratePosition: null,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTreasurePosition: (state, action) => {
      state.treasurePosition = action.payload
    },
    setPiratePosition: (state, action) => {
      state.piratePosition = action.payload
    },
  }
})

export const { setTreasurePosition, setPiratePosition } = gameSlice.actions;

export default gameSlice.reducer;