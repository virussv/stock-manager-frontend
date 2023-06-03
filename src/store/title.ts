import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//a simple slice to change header title dynamically
const slice = createSlice({
  name: 'title',
  initialState:{
    animeTitle: false,
    titles: {
      h1: '',
      h2: '',
    },
  },
  reducers: {
    setAnimeTitle(state,action:PayloadAction<boolean>) {
      state.animeTitle = action.payload;
    },
    setTitles(state,action:PayloadAction<{h1: string,h2: string}>) {
      state.titles.h1 = action.payload.h1;
      state.titles.h2 = action.payload.h2;
    },
  },
});

export const { setTitles,setAnimeTitle } = slice.actions;
export default slice.reducer;