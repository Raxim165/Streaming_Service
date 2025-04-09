import { configureStore, combineSlices } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import trailerSlice from "../pages/Movie/trailerMovieSlice";
import authFormSlice from "../ui/AuthForm/authFormSlice";
import registrationCompletedSlice from "../ui/RegistrationCompleted/registrationCompletedSlice";
import registrationButtonSlice from "../ui/AuthForm/registrationButtonSlice";

const rootReducer = combineSlices(
  trailerSlice,
  authFormSlice,
  registrationCompletedSlice,
  registrationButtonSlice,
);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState,
  });

  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
