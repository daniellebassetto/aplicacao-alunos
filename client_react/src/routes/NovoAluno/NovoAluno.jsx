import './NovoAluno.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiUserPlus, FiCornerDownLeft } from 'react-icons/fi';
import { useState } from 'react';

const NovoAluno = () => {
    const { alunoId } = useParams();
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState('');

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    async function loadAluno() {
        try {
            const response = await api.get(`api/aluno/${alunoId}`, authorization);
        } catch (error) {
            alert('Erro ao recuperar o aluno' + error);
            navigate('/alunos');
        }
    }

    return (
        <div className='novo-aluno-container'>
            <div className='content'>
                <section className='form'>
                    <FiUserPlus size={105} color='#17202a' />
                    <h1>{alunoId === '0' ? 'Incluir Novo Aluno' : 'Atualizar Aluno'}</h1>
                    <Link className="back-link" to="/alunos">
                        <FiCornerDownLeft size={25} color='#17202a' />
                        Retornar
                    </Link>
                </section>
                <form>
                    <input placeholder='Nome' />
                    <input placeholder='Email' />
                    <input placeholder='Idade' />
                    <button className='button' type='submit'>{alunoId === '0' ? 'Incluir Novo Aluno' : 'Atualizar Aluno'}</button>
                </form>
            </div>
        </div>
    )
}

export default NovoAluno