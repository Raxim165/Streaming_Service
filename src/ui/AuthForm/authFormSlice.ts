import { createAppSlice } from "../../store/createAppSlice";

interface AuthState {
  show: boolean;
}

const initialState: AuthState = {
  show: false,
}

const authFormSlice = createAppSlice({
  name: "authForm",
  initialState,
  reducers: create => ({
    toggleShowAuthForm: create.reducer((state, action: { payload: boolean }) => {
      state.show = action.payload;
    }),
  }),
})

export const { toggleShowAuthForm } = authFormSlice.actions;
export default authFormSlice;
