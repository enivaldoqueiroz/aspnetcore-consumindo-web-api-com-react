import React, { useEffect, useState } from 'react';
import './styles.css';
import { FiCornerDownLeft, FiUserPlus } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';

import api from '../../services/api';

export default function NovoAluno(){

    const [id, setId] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState(0);
    
    const {alunoId} = useParams();
    const history = useNavigate();

    const token = localStorage.getItem('token');
    const authorization = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    //Vericando o Id do aluno
    useEffect(()=>{
        if (alunoId === '0')
            return;
        else
            loadAluno();    
    }, alunoId)

    async function loadAluno(){
        try {
            //Para obter os dados do aluno
            const response = await api.get(`api/alunos/${alunoId}`, authorization);

            setId(response.data.id);
            setNome(response.data.nome);
            setEmail(response.data.email);
            setIdade(response.data.idade);

        } catch (error) {
            alert('Erro ao recuperar o aluno ' + error);
            history('/alunos');
        }
    }

    async function saveOrUpdate(event){
        event.preventDefault();// Evitar o refresh na pagina de NovoAluno ao clicar no botão 'Incluir'
        const data = {
            nome,
            email,
            idade
        }

        try {
            //Salvar ou Editar aluno
            if (alunoId === '0')
                await api.post('api/alunos', data, authorization); //Post salva
            else
            {
                data.id = id;
                await api.put(`api/alunos/${id}`, data, authorization); //Put edita
            }                        
        } catch (error) {
            alert('Erro ao gravar aluno ' + error);
        }

        history('/alunos');
    }

    return(
        <div className='novo-aluno-container'>
            <div className='content'>
                <section className='form'>
                    <FiUserPlus size={105} color='#17202a'/>
                    <h1>{alunoId === '0' ? 'Incluir Novo Aluno' : 'Atualizar Aluno'}</h1>
                    <Link className='back-link' to="/alunos">
                        <FiCornerDownLeft size={25} color='#17202a'/>
                        Retornar
                    </Link>
                </section>
                <form onSubmit={saveOrUpdate}>
                    {/*
                        Obs.: Para exibir a informação na tela usamos ex: 'value={nome}'
                        Obs.: Para realizar o input do usuario usamos ex: 'onChange={e=>setNome(e.target.value)}'
                    */}
                    <input placeholder='Nome' 
                        value={nome}
                        onChange={e=>setNome(e.target.value)}
                    ></input>
                    <input placeholder='Email' 
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    ></input>
                    <input placeholder='Idade' 
                        value={idade}
                        onChange={e=>setIdade(e.target.value)}
                    ></input>
                    <button className='button' type='submit'>{alunoId === '0' ? 'Incluir' : 'Atualizar'}</button>
                </form>
            </div>
        </div>
    );
}