import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

import logoCadastro from '../../assets/icon-cadastro.png';
import { FiXCircle, FiEdit, FiUserX } from 'react-icons/fi';
import {useNavigate} from 'react-router-dom';

export default function Alunos() {

  //const [nome, setNome] = useState('');
  const [alunos, setAlunos] = useState([]);
  
  //Filtrar dados
  const [filtro, setFiltro] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  const history = useNavigate();

  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  useEffect(() => {
    api.get('api/alunos', authorization)
      .then(response => {
        setAlunos(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar os alunos:', error);
      });
  }, []); // Passando um array vazio para executar apenas uma vez
 
  async function logaut(){
    try {
        localStorage.clear();
        localStorage.setItem('token','');
        authorization.headers = '';
        history('/');
    } catch (error) {
        alert('Não foi possível fazer o logout' + error);
    }
  }

  //Editar Aluno
  async function editAluno(id){
    try {
      history(`aluno/novo/${id}`);
    } catch (error) {
      alert('Não foi possível editar o aluno');
    }
  }

  //Função para filtragem dos dados
  const searchAlunos = (searchValue) => {
    setSearchInput(searchValue);

    if (searchInput !== '') {
      const dadosFiltrados = alunos.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      });
      setFiltro(dadosFiltrados);
    } else {
      setFiltro(alunos);
    }
  }

  //Função para deletar aluno
  async function deleteAluno(id, nome){
    try {
      if (window.confirm('Deseja deletar o aluno de id: ' + id + 'e Nome: '+ nome +'?')) {
        await api.delete(`api/alunos/${id}`, authorization);
        setAlunos(alunos.filter(aluno => aluno.id !== id));
      } else {
        alert('Não foi possível excluir o aluno');
      }
    } catch (error) {
      
    }
  }

  return (
    <div className='aluno-container'>
      <header>
        <img src={logoCadastro} alt='Cadastro'></img>
        <span>Bem-Vindo, <strong>{email}</strong></span>
        <Link className='button' to="aluno/novo/0">Novo Aluno</Link>
        <button onClick={logaut} type='button'>
          <FiXCircle size={35} color='#17202a'></FiXCircle>
        </button>
      </header>
      <form>
        <input onChange={(e) => searchAlunos(e.target.value)} type='text' placeholder='filtrar por nome'></input>
        {/*<button type='button' className='button'>Filtrar aluno por nome (parcial)</button>*/}
      </form>
      <h1>Relação de Alunos</h1>
      {searchInput.length > 1 ? (
        <ul>
          {filtro.map(aluno => (
            <li key={aluno.id}>
              <b>Nome:</b> {aluno.nome}<br /><br />
              <b>Email:</b> {aluno.email}<br /><br />
              <b>Idade:</b> {aluno.idade}<br /><br />

              <button onClick={()=> editAluno(aluno.id)} type='button'><FiEdit size={25} color='#17202a' /></button>
              <button onClick={()=> deleteAluno(aluno.id, aluno.nome)}><FiUserX size={25} color='#17202a' /></button>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {alunos.map(aluno => (
            <li key={aluno.id}>
              <b>Nome:</b> {aluno.nome}<br /><br />
              <b>Email:</b> {aluno.email}<br /><br />
              <b>Idade:</b> {aluno.idade}<br /><br />

              <button onClick={()=> editAluno(aluno.id)} type='button'><FiEdit size={25} color='#17202a' /></button>
              <button onClick={()=> deleteAluno(aluno.id, aluno.nome)}><FiUserX size={25} color='#17202a' /></button>
            </li>
          ))}
        </ul>
      )} 
      
    </div>
  )
}
