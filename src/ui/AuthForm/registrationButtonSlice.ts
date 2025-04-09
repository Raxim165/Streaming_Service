import { createAppSlice } from "../../store/createAppSlice";

interface AuthState {
  show: boolean;
}

const initialState: AuthState = {
  show: false,
}

const registrationButtonSlice = createAppSlice({
  name: "registrationButton",
  initialState,
  reducers: create => ({
    toggleShowRegistrationButton: create.reducer((state, action: { payload: boolean }) => {
      state.show = action.payload;
    }),
  }),
})

export const { toggleShowRegistrationButton } = registrationButtonSlice.actions;
export default registrationButtonSlice;
