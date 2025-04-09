import { createAppSlice } from "../../store/createAppSlice";

interface TrailerState {
  show: boolean;
}

const initialState: TrailerState = {
  show: false,
}

const trailerSlice = createAppSlice({
  name: "trailer",
  initialState,
  reducers: create => ({
    toggleShowTrailer: create.reducer((state, action: { payload: boolean }) => {
      state.show = action.payload;
    }),
  }),
})

export const { toggleShowTrailer } = trailerSlice.actions;
export default trailerSlice;
