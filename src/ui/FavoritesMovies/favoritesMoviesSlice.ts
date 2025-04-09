// import { createAppSlice } from "../../store/createAppSlice";
// import { PayloadAction } from "@reduxjs/toolkit";

// interface Movie {
//   movieIds: string[];
// }

// const initialState: Movie = {
//   movieIds: [],
// };

// const favoritesMoviesSlice = createAppSlice({
//   name: "favorites",
//   initialState,
//   reducers: {
//     setFavorites(state, action: PayloadAction<string[]>) {
//       state.movieIds = action.payload;
//     },
//     addFavofites(state, action: PayloadAction<string>) {
//       if (!state.movieIds.includes(action.payload)) {
//         state.movieIds.push(action.payload);
//       }
//     },
//     removeFavorites(state, action: PayloadAction<string>) {
//       state.movieIds = state.movieIds.filter(id => id !== action.payload);
//     },
//   }
// });

// export const { setFavorites, addFavofites, removeFavorites } = favoritesMoviesSlice.actions;
// export default favoritesMoviesSlice;