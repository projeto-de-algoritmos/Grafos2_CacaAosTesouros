// gameSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  treasurePosition: null,
  piratePosition: null,
  isTreasureSelected: false,
  shortestPath: null, // Adicionando a propriedade shortestPath ao estado inicial
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
    setShortestPath: (state, action) => { // Adicionando a action setShortestPath para atualizar o estado com o caminho mais curto
      state.shortestPath = action.payload;
    },
  }
})

export const { setTreasurePosition, treasureSelected, setPiratePosition, setShortestPath } = gameSlice.actions;

export default gameSlice.reducer;