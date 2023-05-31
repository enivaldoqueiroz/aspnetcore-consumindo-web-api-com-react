import React from 'react';
import './styles.css';

export default function NovoAluno(){
    return(
        <div className='novo-aluno-container'>
            <div className='content'>
                <h1>Text</h1>
                <section className='form'>
                </section>
                <form>
                    <input placeholder='Nome'></input>
                    <input placeholder='Email'></input>
                    <input placeholder='Idade'></input>
                    <button className='button' type='submit'>Text</button>
                </form>
            </div>
        </div>
    );
}