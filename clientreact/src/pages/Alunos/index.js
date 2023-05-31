import React from 'react';
import './styles.css';

import logoCadastro from '../../assets/icon-cadastro.png';
import { Link } from 'react-router-dom';
import { FiXCircle, FiEdit, FiUserX } from 'react-icons/fi';

export default function Alunos(){
    return(
        <div className='aluno-container'>
            <header>
                <img src={logoCadastro} alt='Cadastro'></img>
                <span>Bem-Vindo, <strong>Desenvolvedor</strong></span>
                <Link className='button' to="aluno/novo">Novo Aluno</Link>
                <button type='button'>
                    <FiXCircle size={35} color='#17202a'></FiXCircle>
                </button>
            </header>
            <form>
                <input type='text' placeholder='Nome'></input>
                <button type='button' class='button'>
                    Filtrar aluno por nome (parcial)
                </button>
            </form>
            <h1>Relação de Alunos</h1>
            <ul>
                <li>
                    <b>Nome: </b>Paulo<br></br>
                    <b>Email: </b>paulo@email.com<p></p>
                    <b>Idade: </b>22<b></b>
                    <button type='button'>
                        <FiEdit size={25} color='#17202a'></FiEdit>
                    </button>
                    <button>
                        <FiUserX size={25} color='#17202a'></FiUserX>
                    </button>
                </li>
                <li>
                    <b>Nome: </b>Paulo<br></br>
                    <b>Email: </b>paulo@email.com<p></p>
                    <b>Idade: </b>22<b></b>
                    <button type='button'>
                        <FiEdit size={25} color='#17202a'></FiEdit>
                    </button>
                    <button>
                        <FiUserX size={25} color='#17202a'></FiUserX>
                    </button>
                </li>
            </ul>
        </div>
    )
}