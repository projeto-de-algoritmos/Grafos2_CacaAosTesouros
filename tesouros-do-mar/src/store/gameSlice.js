import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  treasurePosition: null,
  piratePosition: null,
  isTreasureSelected: false,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTreasurePosition: (state, action) => {
      state.treasurePosition = action.payload;
    },
    treasureSelected: (state) => {
      state.isTreasureSelected = true;
    },
    setPiratePosition: (state, action) => {
      state.piratePosition = action.payload
    },
  }
})

export const { setTreasurePosition, treasureSelected, setPiratePosition } = gameSlice.actions;

export default gameSlice.reducer;