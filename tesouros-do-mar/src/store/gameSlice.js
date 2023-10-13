import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  treasurePosition: null,
  piratePosition: null,
  istreasureSelected: false,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTreasurePosition: (state, action) => {
      state.treasurePosition = action.payload;
      state.istreasureSelected = true;
    },
    setPiratePosition: (state, action) => {
      state.piratePosition = action.payload
    },
  }
})

export const { setTreasurePosition, setPiratePosition } = gameSlice.actions;

export default gameSlice.reducer;