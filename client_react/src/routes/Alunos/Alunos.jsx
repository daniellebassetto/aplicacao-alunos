import { Link } from 'react-router-dom';
import { FiXCircle, FiEdit, FiUserX } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import logoCadastro from '../../assets/cadastro1.png'
import './Alunos.css';

const Alunos = () => {
    const [searchInput, setSearchInput] = useState('');
    const [filtro, setFiltro] = useState([]);

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

    const searchAlunos = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== '') {
            const dadosFiltrados = alunos.filter((item) => {
                return Object.values(item).join('').toLowerCase()
                    .includes(searchInput.toLowerCase())
            });
            setFiltro(dadosFiltrados);
        }
        else {
            setFiltro(alunos);
        }
    }

    async function editAluno(id) {
        try {
            navigate(`/aluno/novo/${id}`);
        } catch (error) {
            alert('Não foi possível editar o aluno')
        }
    }

    async function deleteAluno(id) {
        try {
            if (window.confirm('Deseja deletar o aluno?')) {
                await api.delete(`api/aluno/${id}`, authorization);
                setAlunos(alunos.filter(aluno => aluno.id !== id));
            }
        } catch (error) {
            alert('Não foi possível excluir o aluno')
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
                <input type='text'
                    placeholder='Filtrar por nome...'
                    onChange={(e) => searchAlunos(e.target.value)}
                />
            </form>

            <h1>Relação de Alunos</h1>
            {searchInput.length > 1 ? (
                <ul>
                    {filtro.map(aluno => (
                        <li key={aluno.Id}>
                            <b>Nome:</b>{aluno.nome}<br /><br />
                            <b>Email:</b>{aluno.email}<br /><br />
                            <b>Idade:</b>{aluno.idade}<br /><br />
                            <button onClick={() => editAluno(aluno.id)} type="button">
                                <FiEdit size="25" color="#17202a" />
                            </button>
                            <button type="button" onClick={() => deleteAluno(aluno.id)}>
                                <FiUserX size="25" color="#17202a" />
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <ul>
                    {alunos.map(aluno => (
                        <li key={aluno.id}>
                            <b>Nome:</b>{aluno.nome}<br /><br />
                            <b>Email:</b>{aluno.email}<br /><br />
                            <b>Idade:</b>{aluno.idade}<br /><br />

                            <button onClick={() => editAluno(aluno.id)} type="button">
                                <FiEdit size="25" color="#17202a" />
                            </button>

                            <button type="button" onClick={() => deleteAluno(aluno.id)}>
                                <FiUserX size="25" color="#17202a" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Alunos