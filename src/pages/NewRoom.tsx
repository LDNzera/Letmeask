import { Link } from 'react-router-dom';

import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/illustration.svg';
import logoImg from '../assets/logo.svg';

import '../styles/auth.scss';

export function NewRoom() {
  const { user } = useAuth();

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas." />
        <strong>Toda pergunta tem uma resposta</strong>
        <p>Crie salas de Q&amp;A ao vivo, aprendendo e compartilhando conhecimento com outras pessoas.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask logo." />
          <h2>Crie uma nova sala</h2>
          <form>
            <input 
              type="text"
              placeholder="Nome da sala" 
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}