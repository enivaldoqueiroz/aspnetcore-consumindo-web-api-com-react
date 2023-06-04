import React, {useState} from "react";
import './styles.css';
import api from '../../services/api';
import {useNavigate} from 'react-router-dom';

import logoImage from  '../../assets/login-management.png';

export default function Login(){

    const [email, setEmail] = useState(''); //useState: Permite armazernar o Status do componente
    const [password, setPassword] = useState('');

    const history = useNavigate();//useNavigate: Redireciona o historico de navegação para o usuario

    async function login(event){
        event.preventDefault();// Evita o refresh na pagina de login ao clicar no botão 'Login'

        const data = {
            email, 
            password
        };

        try {
            const response = await api.post('/api/account/loginUser', data);

            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);

            history('/alunos');

        } catch (error) {
            alert('O login falhou ' + error);
        }
    }

    return(
        <div className="login-container">
            <section className="form">
            <img src={logoImage} alt="Login" id="img-login-management"></img>
            <form onSubmit={login}>
                <h1 id="cadastro-de-alunos">Cadastro de Alunos</h1>

                <input placeholder="Email"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                />

                <input type="password" placeholder="Password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />

                <button className="button" type="submit">Login</button>
            </form>
            </section>
        </div>
    );
}