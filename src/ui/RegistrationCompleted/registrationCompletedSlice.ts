import { createAppSlice } from "../../store/createAppSlice";

interface AuthState {
  show: boolean;
}

const initialState: AuthState = {
  show: false,
}

const registrationCompletedSlice = createAppSlice({
  name: "registrationCompleted",
  initialState,
  reducers: create => ({
    toggleShowRegistrationCompleted: create.reducer((state, action: { payload: boolean }) => {
      state.show = action.payload;
    }),
  }),
})

export const { toggleShowRegistrationCompleted } = registrationCompletedSlice.actions;
export default registrationCompletedSlice;
