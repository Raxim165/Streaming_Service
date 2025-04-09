import './settingsAccount.css'
import { useProfile } from '../../api/authUser'
import { fetchLogoutUser } from '../../api/authUser';
import { Link } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

export const SettingsAccount = () => {
  const { state } = useProfile();
  switch(state.status) {
    case "loading": return <Loader />;
    case "error": return <div>Error: {String(state.error)}</div>;
    case "success":

      return (
        <div>
          <div style={{display: 'flex', marginBottom: '40px'}}>
            <span className='settings-avatar'>
              {state.data.name.slice(0, 1)}{state.data.surname.slice(0, 1)}
            </span>
            <div>
              <p style={{marginBottom: '8px'}}>Имя Фамилия</p>
              <p className='settings-text'>{state.data.name} {state.data.surname}</p>
            </div>
          </div>
          <div style={{display: 'flex', marginBottom: '64px'}}>
            <span className='email-icon'></span>
            <div>
              <p style={{marginBottom: '8px'}}>Электронная почта</p>
              <p className='settings-text'>{state.data.email}</p>
            </div>
          </div>

          <Link
            to={'/'}
            onClick={async () => {
              localStorage.setItem('surname', '');
              await fetchLogoutUser();
            }}
            className='settings-button-logout'>
              Выйти из аккаунта
          </Link>
        </div>
      );
  }
}