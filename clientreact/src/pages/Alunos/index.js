import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

import logoCadastro from '../../assets/icon-cadastro.png';
import { FiXCircle, FiEdit, FiUserX } from 'react-icons/fi';
import {useNavigate} from 'react-router-dom';

export default function Alunos() {

  const [nome, setNome] = useState('');
  const [alunos, setAlunos] = useState([]);

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
        <input type='text' placeholder='Nome'></input>
        <button type='button' className='button'>
          Filtrar aluno por nome (parcial)
        </button>
      </form>
      <h1>Relação de Alunos</h1>
      <ul>
        {alunos.map(aluno => (
          <li key={aluno.id}>
            <b>Nome:</b> {aluno.nome}<br /><br />
            <b>Email:</b> {aluno.email}<br /><br />
            <b>Idade:</b> {aluno.idade}<br /><br />

            <button type='button'><FiEdit size={25} color='#17202a' /></button>
            <button><FiUserX size={25} color='#17202a' /></button>
          </li>
        ))}
      </ul>
    </div>
  )
}
