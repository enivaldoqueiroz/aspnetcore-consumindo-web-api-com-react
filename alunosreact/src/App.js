import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logoCadastro from './assets/cadastro.png';
import React, { useState, useEffect } from 'react';

function App() {
  
  //Endereço para acessar a API dos alunos
  const baseUrl="https://localhost:44379/api/alunos";

  //Hook useState enviar um resquest para API Usando AXIOS
  const [data, setData]=useState([]);

  const [modalIncluir, setModalIncluir]=useState(false);

  const [alunoSelecionado, setAlunoSelecionado]=useState(
  {
    id: '',
    nome: '',
    email: '',
    idade: ''
  });

  const abrirFecharModalInluir=()=>{
    setModalIncluir(!modalIncluir);
  }

  //Metodo para trazer uma resquest para API Usando AXIOS
  const pedidoGet = async() =>{
    await axios.get(baseUrl)
    .then(response => {
      setData(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

const pedidoPost=async()=>{
  delete alunoSelecionado.id;
  alunoSelecionado.idade=parseInt(alunoSelecionado.idade);
    await axios.post(baseUrl, alunoSelecionado)
  .then(response=>{
    setData(data.concat(response.data));
    abrirFecharModalInluir();
  }).catch(error=>{
    console.log(error);
  })
}
  
  //Hook useEffect
  useEffect(()=>{
    pedidoGet();
  })


  const handleChange=e=>{
    const {name, value}=e.target;
    setAlunoSelecionado({
      ...alunoSelecionado,
      [name]:value
    });
    console.log(alunoSelecionado)
  }

  return (
    <div className="aluno-container">
      <br/>
      <h3>Cadastro de Alunos</h3>
      <header>
        <img src={logoCadastro} alt='Cadastro'></img>
        <button className='btn btn-success' onClick={()=>abrirFecharModalInluir()}>Add Novo Aluno</button>
      </header>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(aluno=>(
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.eamil}</td>
              <td>{aluno.idade}</td>
              <td>
                <button className='btn btn-primary'>Editar</button>{" "}
                <button className='btn btn-danger'>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir Aluno</ModalHeader>
        <ModalBody>
            <div className='form-group'>
              <label>Nome: </label>
              <br/>
              <input type='text' className='Form-control' name='nome' onChange={handleChange}/>
              <br/>
              <label>Email: </label>
              <br/>
              <input type='text' className='Form-control'name='email' onChange={handleChange}/>
              <br/>
              <label>Idade: </label>
              <br/>
              <input type='text' className='Form-control'name='idade' onChange={handleChange}/>
              <br/>
            </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={()=>pedidoPost()}>Incluir</button>{" "}
          <button className='btn btn-danger' onClick={()=>abrirFecharModalInluir()}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
