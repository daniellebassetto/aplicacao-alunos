import './Alunos.css';
import logoCadastro from '../../assets/cadastro1.png'
import { Link } from 'react-router-dom';
import { FiXCircle, FiEdit, FiUserX } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Alunos = () => {
    const [alunos, setAlunos] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    async function logout() {
        try {
            localStorage.clear();
            localStorage.setItem('token', '')
            authorization.headers = '';
            navigate('/');
        } catch (error) {
            alert('Não foi possível fazer o logout' + error)
        }
    }

    async function editAluno(id) {
        try {
            navigate(`/aluno/novo/${id}`);
        } catch (error) {
            alert('Não foi possível editar o aluno')
        }
    }

    useEffect(() => {
        api.get('api/aluno', authorization).then(
            response => {
                setAlunos(response.data);
            }, token)
    }, [])

    return (
        <div className='aluno-container'>
            <header>
                <img src={logoCadastro} alt="Cadastro" />
                <span>Bem-vindo(a), <strong>{email}</strong></span>
                <Link className='button' to="/aluno/novo/0">Novo aluno</Link>
                <button onClick={logout} type='button'>
                    <FiXCircle size={35} color='#17202a' />
                </button>
            </header>
            <form>
                <input type="text" placeholder='Nome' />
                <button type='button' className='button'>
                    Filtrar aluno por nome (parcial)
                </button>
            </form>
            <h1>Relação de Alunos</h1>
            <ul>
                {alunos.map(aluno => (
                    <li key={aluno.id}>
                        <b>Nome:</b>{aluno.nome}<br /><br />
                        <b>Email:</b>{aluno.email}<br /><br />
                        <b>Idade:</b>{aluno.idade}<br /><br />
                        <button type='button' onClick={() => editAluno(aluno.id)}>
                            <FiEdit size={25} color='#17202a' />
                        </button>
                        <button type='button'>
                            <FiUserX size={25} color='#17202a' />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Alunos