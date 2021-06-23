import { ButtonHTMLAttributes } from 'react';
import { useHistory } from 'react-router-dom';

import logoImg from '../assets/logo.svg';

import '../styles/logo-button.scss';

type LogoButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function LogoButton(props: LogoButtonProps) {
  const history = useHistory();
  
  function handleHome() {
    history.push('/');
  }
  
  return (
    <button 
      className="logo-button" {...props}
      onClick={handleHome}
    >
      <img src={logoImg} alt="Letmeask" />
    </button>
  );
}