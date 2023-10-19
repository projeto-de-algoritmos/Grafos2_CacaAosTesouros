// gameSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  treasurePosition: null,
  isTreasureSelected: false,
  shortestPath: [],
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
    setShortestPath: (state, action) => {
      state.shortestPath = action.payload;
    },
  }
})

export const { setTreasurePosition, treasureSelected, setShortestPath } = gameSlice.actions;

export default gameSlice.reducer;