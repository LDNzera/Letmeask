import { useHistory, useParams } from 'react-router-dom';

// import toast, { Toaster } from 'react-hot-toast';

import { LogoButton } from '../../components/LogoButton';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';
import { Button } from '../../components/Button';

import { database } from '../../services/firebase';

// import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';

import deleteImg from '../../assets/delete.svg';

import './styles.scss';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  // const { user } = useAuth();

  const history = useHistory();

  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    if (window.confirm('Tem certeza que deseja encerrar essa sala?')) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      })
    }

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  return (
    <div id="page-admin-room">
      <header>
        <div className="content">
          <LogoButton />
          <div>
            <RoomCode code={roomId}/>
            <Button 
              isOutlined
              onClick={handleEndRoom}
            >
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">
        {questions.map(question => {
          return <Question 
            key={question.id}
            content={question.content} 
            author={question.author} 
            >
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
        })}
        </div>
      </main>
    </div>
  )
}