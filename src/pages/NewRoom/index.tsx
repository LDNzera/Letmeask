import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { database } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';

import { Button } from '../../components/Button/index';
import { LogoButton } from '../../components/LogoButton';

import illustrationImg from '../../assets/illustration.svg';

import './styles.scss';

export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');

  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');
    
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-new-room">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas." />
        <strong>Toda pergunta tem uma resposta</strong>
        <p>Crie salas de Q&amp;A ao vivo, aprendendo e compartilhando conhecimento com outras pessoas.</p>
      </aside>
      <main>
        <div className="main-content">
          <div className="logo-button">
            <LogoButton />
          </div>
          <div className="separator-full" />
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala" 
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
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