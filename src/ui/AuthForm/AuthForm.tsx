import './authForm.css'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useState, useEffect } from 'react';
import { fetchRegisterUser, fetchLoginUser, fetchProfile } from '../../api/authUser';
import { toggleShowAuthForm } from './authFormSlice';
import { toggleShowRegistrationCompleted } from '../RegistrationCompleted/registrationCompletedSlice';
import { toggleShowRegistrationButton } from './registrationButtonSlice';

export const AuthForm = () => {
  const dispatch = useAppDispatch();
  const [isRegistering, setIsRegistering] = useState(false);
  const showRegistrationButton = useAppSelector(state => state.registrationButton.show);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [registerStatusCode, setRegisterStatusCode] = useState<number>(0);
  const [loginStatusCode, setloginStatusCode] = useState<number>(0);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      try {
        if (emailError || passwordError || passwordConfirmError || passwordMismatchError) return;
        await fetchRegisterUser(email, name, surname, password);
        dispatch(toggleShowAuthForm(false));
        dispatch(toggleShowRegistrationCompleted(true))
      } catch (error) {
        if (typeof error === 'object' && error !== null && 'status' in error) {
          setRegisterStatusCode((error as { status: number }).status);
        }
      }
    } else {
      try {
        if (emailError || passwordError) return;
        await fetchLoginUser(email, password);
        const profile = await fetchProfile();
        localStorage.setItem('surname', JSON.stringify(profile.surname));
        dispatch(toggleShowAuthForm(false));
      } catch (error) {
        if (typeof error === 'object' && error !== null && 'status' in error) {
          setloginStatusCode((error as { status: number }).status);
        }
      }
    }
  };

  const colorError = '#FF7575';

  const [fullHeight, setFullHeight] = useState(document.documentElement.scrollHeight);
  useEffect(() => {
    const handleResize = () => setFullHeight(document.documentElement.scrollHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='auth-modal' style={{ height: `${fullHeight}px` }}>
      <div className='auth-wrapper'>
        <button
          className='auth-close'
          onClick={() => {
            dispatch(toggleShowAuthForm(false));
            dispatch(toggleShowRegistrationButton(false));
          }}
          aria-label='закрыть окно учётной записи'
          >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="24" fill="white"/>
          <path d="M22.5859 24L14.793 16.2071L16.2072 14.7928L24.0001 22.5857L31.793 14.7928L33.2072 16.2071L25.4143 24L33.2072 31.7928L31.793 33.2071L24.0001 25.4142L16.2072 33.2071L14.793 31.7928L22.5859 24Z" fill="black"/>
          </svg>
        </button>
        <form
          onSubmit={e => onSubmit(e)}
          className='auth-form'
          >
          <img className='auth-logo' src="src/assets/icons/маруся_black_logo.svg" alt="logo" />
          {isRegistering && (<p className='auth-title'>Регистрация</p>)}
          <div className='auth-input-wrapper'>
            <input
              style={emailError ? { borderColor: colorError } : {}}
              required
              className='auth-input'
              type="text"
              placeholder='Электронная почта'
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={e => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (e.target.value.length < 6 || !regex.test(e.target.value)) setEmailError(true);
              }}
              onFocus={() => setEmailError(false)}
            />

            <svg className='auth-input-icon' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path style={emailError ? { fill: colorError } : {}} d="M21 3.75C21.5523 3.75 22 4.19772 22 4.75V20.7566C22 21.3052 21.5447 21.75 21.0082 21.75H2.9918C2.44405 21.75 2 21.3051 2 20.7566V19.75H20V8.05L12 15.25L2 6.25V4.75C2 4.19772 2.44772 3.75 3 3.75H21ZM8 15.75V17.75H0V15.75H8ZM5 10.75V12.75H0V10.75H5ZM19.5659 5.75H4.43414L12 12.5593L19.5659 5.75Z" fill="black" fillOpacity="0.4"/>
            </svg>
          </div>

          {registerStatusCode === 409 && <p className='auth-error'>Пользователь с такой почтой уже существует</p>}
          {emailError && <p className='auth-error'>Email должен содержать минимум 6 символов, пример: example@red.com</p>}
          {isRegistering && (
          <>
            <div className='auth-input-wrapper'>
              <input
                required
                className='auth-input'
                type="text"
                placeholder='Имя'
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <svg className='auth-input-icon' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 22.75C4 18.3317 7.58172 14.75 12 14.75C16.4183 14.75 20 18.3317 20 22.75H18C18 19.4363 15.3137 16.75 12 16.75C8.68629 16.75 6 19.4363 6 22.75H4ZM12 13.75C8.685 13.75 6 11.065 6 7.75C6 4.435 8.685 1.75 12 1.75C15.315 1.75 18 4.435 18 7.75C18 11.065 15.315 13.75 12 13.75ZM12 11.75C14.21 11.75 16 9.96 16 7.75C16 5.54 14.21 3.75 12 3.75C9.79 3.75 8 5.54 8 7.75C8 9.96 9.79 11.75 12 11.75Z" fill="black" fillOpacity="0.4"/>
              </svg>
            </div>

            <div className='auth-input-wrapper'>
              <input
                required
                className='auth-input'
                type="text"
                placeholder='Фамилия'
                value={surname}
                onChange={e => setSurname(e.target.value)}
              />
              <svg className='auth-input-icon' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 22.75C4 18.3317 7.58172 14.75 12 14.75C16.4183 14.75 20 18.3317 20 22.75H18C18 19.4363 15.3137 16.75 12 16.75C8.68629 16.75 6 19.4363 6 22.75H4ZM12 13.75C8.685 13.75 6 11.065 6 7.75C6 4.435 8.685 1.75 12 1.75C15.315 1.75 18 4.435 18 7.75C18 11.065 15.315 13.75 12 13.75ZM12 11.75C14.21 11.75 16 9.96 16 7.75C16 5.54 14.21 3.75 12 3.75C9.79 3.75 8 5.54 8 7.75C8 9.96 9.79 11.75 12 11.75Z" fill="black" fillOpacity="0.4"/>
              </svg>
            </div>
          </>
          )}
          <div className='auth-input-wrapper'>
            <input
              style={passwordError || passwordMismatchError ? { borderColor: colorError } : {}}
              required
              className='auth-input'
              type="password"
              placeholder='Пароль'
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={e => {
                if (e.target.value.length < 6) setPasswordError(true);
                if (password && passwordConfirm && password !== passwordConfirm) {
                  setPasswordMismatchError(true);
                }
              }}
              onFocus={() => {
                setPasswordMismatchError(false);
                setPasswordError(false);
              }}
            />
            <svg className='auth-input-icon' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path style={passwordError || passwordMismatchError ? { fill: colorError } : {}} d="M12.917 13.75C12.441 16.5877 9.973 18.75 7 18.75C3.68629 18.75 1 16.0637 1 12.75C1 9.43629 3.68629 6.75 7 6.75C9.973 6.75 12.441 8.91229 12.917 11.75H23V13.75H21V17.75H19V13.75H17V17.75H15V13.75H12.917ZM7 16.75C9.20914 16.75 11 14.9591 11 12.75C11 10.5409 9.20914 8.75 7 8.75C4.79086 8.75 3 10.5409 3 12.75C3 14.9591 4.79086 16.75 7 16.75Z" fill="black" fillOpacity="0.4"/>
            </svg>
          </div>
          {passwordError && <p className='auth-error'>Пароль должен иметь не менее 6 символов</p>}
          {loginStatusCode === 400 && <p className='auth-error'>Неверный Email или пароль</p>}
          {isRegistering && (
            <>
              <div className='auth-input-wrapper'>
                <input
                  style={passwordConfirmError || passwordMismatchError ? { borderColor: colorError } : {}}
                  required
                  className='auth-input'
                  type="password"
                  placeholder='Подтвердите пароль'
                  value={passwordConfirm}
                  onChange={e => setPasswordConfirm(e.target.value)}
                  onBlur={e => {
                    if (e.target.value.length < 6) setPasswordConfirmError(true);
                    if (password && passwordConfirm && password !== passwordConfirm) {
                      setPasswordMismatchError(true);
                    }
                  }}
                  onFocus={() => {
                    setPasswordConfirmError(false);
                    setPasswordMismatchError(false);
                  }
                  }
                />
                <svg className='auth-input-icon' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path style={passwordConfirmError || passwordMismatchError ? { fill: colorError } : {}} d="M12.917 13.75C12.441 16.5877 9.973 18.75 7 18.75C3.68629 18.75 1 16.0637 1 12.75C1 9.43629 3.68629 6.75 7 6.75C9.973 6.75 12.441 8.91229 12.917 11.75H23V13.75H21V17.75H19V13.75H17V17.75H15V13.75H12.917ZM7 16.75C9.20914 16.75 11 14.9591 11 12.75C11 10.5409 9.20914 8.75 7 8.75C4.79086 8.75 3 10.5409 3 12.75C3 14.9591 4.79086 16.75 7 16.75Z" fill="black" fillOpacity="0.4"/>
                </svg>
              </div>
              {isRegistering && passwordConfirmError && <p className='auth-error'>Пароль должен иметь не менее 6 символов</p>}
              {isRegistering && passwordMismatchError && <p className='auth-error'>Пароли не совпадают</p>}
            </>
          )}
          <button className='auth-button-login' type="submit">
            {isRegistering ? 'Создать аккаунт' : 'Войти'}
          </button>

          {isRegistering && (
          <button
            onClick={() => setIsRegistering(false)}
            className='auth-button-logout'>
            У меня уже есть аккаунт
          </button>
          )}
          {showRegistrationButton || !isRegistering && (
          <button
            onClick={() => setIsRegistering(true)}
            className='auth-button-logout'>
            Регистрация
          </button>
          )}
        </form>
      </div>
    </div>
  );
};