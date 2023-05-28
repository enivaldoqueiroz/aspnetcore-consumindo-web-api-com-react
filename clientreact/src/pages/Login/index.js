import React from "react";
import './styles.css';
import logoImage from  '../../assets/login-management.png';

export default function Login(){
    return(
        <div className="login-container">
            <section className="form"></section>
            <img src={logoImage} alt="Login" id="login-management"></img>
            <form>
                <h1>Cadastro de Alunos</h1>
                <input placeholder="Email"></input>
                <input type="password" placeholder="Password"></input>
                <button class="button" type="submit">Login</button>
            </form>

        </div>
    );
}