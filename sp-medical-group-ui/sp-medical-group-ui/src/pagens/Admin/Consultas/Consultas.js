import React, { Component } from 'react';
import Axios from 'axios';
import './Consultas.css';

class Consultas extends Component {
    constructor() {
        super();
        this.state = {
            listaConsultas: [],
            listaProntruario: [],
            listaMedico: [],
            descricao: "",
            idMedico: "",
            idProntuario: "",
            dataAgendamento: "",
            idStatus: 3

        };
    }

    buscarMedicos() {
        Axios.get('http://192.168.3.216:5000/api/Medicos', {
            headers:
            {
                "Authorization": 'Bearer ' + localStorage.getItem('usuario')
            }
        })
            .then(data => {
                console.log(data.data);
                this.setState({ listaMedico: data.data })
            })
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

    buscarConsultas() {
        Axios.get('http://192.168.3.216:5000/api/consultas', {
            headers:
            {
                "Authorization": 'Bearer ' + localStorage.getItem('usuario')
            }
        })
            .then(data => {
                console.log(data.data);
                this.setState({ listaConsultas: data.data })
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
    cadastraConsulta(event) {
        event.preventDefault();
        let consulta = {
            idMedico: this.state.idMedico,
            idProntuario: this.state.idProntuario,
            dataAgendamento: this.state.dataAgendamento,
            idStatus: 3
        };

        Axios.post('http://192.168.3.216:5000/api/consultas', consulta, {
            headers:
            {
                "Authorization": 'Bearer ' + localStorage.getItem('usuario')
            }
        });
        console.log(consulta);
    }

    atualizaEstadoIdMedico(event) {
        this.setState({ idMedico: event.target.value });
    }

    atualizaEstadoIdProntuario(event) {
        this.setState({ idProntuario: event.target.value });
    }

    atualizaEstadoDataAgendamento(event) {
        this.setState({ dataAgendamento: event.target.value });
    }

    atualizaEstadoIdStatusNavigation(event) {
        this.setState({ idStatus: event.target.value });
    }

    componentDidMount() {
        this.buscarMedicos();
        this.buscarProntruarios();
        this.buscarConsultas();
        this.buscarUsuarios();
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
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th id="thc">#</th>
                                        <th id="thc">Descrição</th>
                                        <th id="thc">Medico</th>
                                        <th id="thc">Prontuario</th>
                                        <th id="thc">Agendamento</th>
                                        <th id="thc">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.listaConsultas.map(function (consulta) {
                                            return (
                                                <tr key={consulta.id}>
                                                    <td>{consulta.id}</td>
                                                    <td>{consulta.descricao}</td>
                                                    <td>{consulta.idMedicoNavigation.idUsuarioNavigation.nome}</td>
                                                    <td>{consulta.idProntuarioNavigation.idUsuarioNavigation.nome}</td>
                                                    <td>{consulta.dataAgendamento}</td>
                                                    <td>{consulta.idStatusNavigation.tipoConsulta}</td>
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


export default Consultas;