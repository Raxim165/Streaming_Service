import "./registrationCompleted.css"
import { useAppDispatch } from "../../store/hooks";
import { toggleShowRegistrationCompleted } from "./registrationCompletedSlice";
import { toggleShowAuthForm } from "../AuthForm/authFormSlice";
import { toggleShowRegistrationButton } from "../AuthForm/registrationButtonSlice";

export const RegistrationCompleted = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="registration-modal">
      <div className="registration-wrapper">
        <button
          className='registration-close'
          onClick={() => dispatch(toggleShowRegistrationCompleted(false))}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="24" fill="white"/>
          <path d="M22.5859 24L14.793 16.2071L16.2072 14.7928L24.0001 22.5857L31.793 14.7928L33.2072 16.2071L25.4143 24L33.2072 31.7928L31.793 33.2071L24.0001 25.4142L16.2072 33.2071L14.793 31.7928L22.5859 24Z" fill="black"/>
          </svg>
        </button>
        <div className="registration-content">
          <img className='registration-logo' src="src/assets/icons/маруся_black_logo.svg" alt="logo" />
          <p className="registration-title">Регистрация завершена</p>
          <p className="registration-text">Используйте вашу электронную почту для входа</p>
          <button
            className="registration-button"
            onClick={(() => {
              dispatch(toggleShowAuthForm(true));
              dispatch(toggleShowRegistrationCompleted(false));
              dispatch(toggleShowRegistrationButton(true));
            })}
            >
            Войти</button>
        </div>
      </div>
    </div>
  )
}