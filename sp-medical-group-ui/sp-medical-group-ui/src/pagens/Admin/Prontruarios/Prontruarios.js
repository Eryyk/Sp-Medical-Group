import React, { Component } from 'react';
import Axios from 'axios';
import '../../Estilos/Navegador.css';
import './Prontruarios.css';

class Prontruarios extends Component {
    constructor() {
        super();
        this.state = {
            listaProntruario: [],
            listaUsuario: [],
            IdUsuarioNavigation: "",
            DataNacimento: "",
            Telefone: "",
            Rg: "",
            Cpf: "",
            Endereco: "",
            Consulta: []
        };
    }

    buscarUsuarios() {
        Axios.get('http://192.168.3.216:5000/api/Usuarios', {
            headers:
            {
                "Authorization": 'Bearer ' + localStorage.getItem('usuario')
            }
        })
            .then(data => {
                console.log(data.data);
                this.setState({ listaUsuario: data.data })
            })
    }

    buscarProntruarios() {
        Axios.get('http://192.168.3.216:5000/api/Prontuarios', {
            headers:
            {
                "Authorization": 'Bearer ' + localStorage.getItem('usuario')
            }
        })
            .then(data => {
                console.log(data.data);
                this.setState({ listaProntruario: data.data })
            })
    }

    componentDidMount() {
        this.buscarProntruarios();
        this.buscarUsuarios();
    }

    atualizaEstadoIdUsuarioNavigation(event) {
        this.setState({ idUsuarioNavigation: event.target.value });
    }

    atualizaEstadoDataNacimento(event) {
        this.setState({ dataNacimento: event.target.value });
    }

    atualizaEstadoTelefone(event) {
        this.setState({ telefone: event.target.value });
    }

    atualizaEstadoRg(event) {
        this.setState({ rg: event.target.value });
    }

    atualizaEstadoCpf(event) {
        this.setState({ cpf: event.target.value });
    }

    atualizaEstadoEndereco(event) {
        this.setState({ endereco: event.target.value });
    }

    cadastraProntruario(event) {
        event.preventDefault();

        let prontruario = {
            IdUsuarioNavigation: this.state.idUsuarioNavigation,
            DataNacimento: this.state.dataNacimento,
            Telefone: this.state.telefone,
            Rg: this.state.rg,
            Cpf: this.state.cpf,
            Endereco: this.state.endereco
        };

        console.log(prontruario);

        Axios.post("http://192.168.3.216:5000/api/Prontruarios");
    }

    realizarLogout() {
        localStorage.clear();
        window.location.href = '/';
    }

    render() {
        return (

            <div className="admin">
                <div className="navegador">
                    <div>
                        <h2 className="h1">Adiministrador</h2>
                    </div>
                    <div className="navegaDiv">
                        <div className="direciona">
                            <i id="icon" class="fas fa-user-md"></i>
                            <a className="navega" href="http://localhost:3000/Admin/Medicos">Medicos</a>
                        </div>
                        <div className="direciona">
                            <i id="icon" class="fas fa-notes-medical"></i>
                            <a className="navega" href="http://localhost:3000/Admin/Prontruarios">Prontuários</a>
                        </div>
                        <div className="direciona">
                            <i id="icon" class="fas fa-file-medical-alt"></i>
                            <a className="navega" href="http://localhost:3000/Admin/Consultas">Consultas</a>
                        </div>
                        <div className="direciona">
                            <i id="icon" class="fas fa-search-location"></i>
                            <a className="navega" href="http://localhost:3000/Admin/Pesquisa">Pesquisa</a>
                        </div>
                        <div className="direciona">
                            <i id="icon" class="fas fa-sign-out-alt"></i>
                            <a className="navega" onClick={this.realizarLogout.bind(this)}>Sair</a>
                        </div>
                    </div>
                </div>
                <div id="Tabela" >
                    <div className="linhaTabela">
                        <div className="container" id="conteudoPrincipallista">
                            <table id="tabela-lista-prontjuario">
                                <thead>
                                    <tr>
                                        <th id="th">#</th>
                                        <th id="th">Usuario</th>
                                        <th id="th">dataNacimento</th>
                                        <th id="th">telefone</th>
                                        <th id="th">rg</th>
                                        <th id="th">cpf</th>
                                        <th id="th1">endereco</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.listaProntruario.map(function (prontruario) {
                                            return (
                                                <tr key={prontruario.id}>
                                                    <td>{prontruario.id}</td>
                                                    <td>{prontruario.idUsuarioNavigation.nome}</td>
                                                    <td>{prontruario.dataNacimento}</td>
                                                    <td>{prontruario.telefone}</td>
                                                    <td>{prontruario.rg}</td>
                                                    <td>{prontruario.cpf}</td>
                                                    <td>{prontruario.endereco}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


export default Prontruarios;