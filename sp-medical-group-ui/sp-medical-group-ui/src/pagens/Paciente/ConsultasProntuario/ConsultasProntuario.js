import React, { Component } from 'react';
import Axios from 'axios';
import '../../Estilos/Medico.css';
import '../../Estilos/Navegador.css';
import '../../Estilos/Tabelas.css';

class ConsultasProntuairo extends Component {
    constructor() {
        super();
        this.state = {
            listaConsultas: [],
            Descricao: "",
            IdMedicoNavigation: "",
            IdProntuarioNavigation: "",
            IdUsuarioNavigation: "",
            DataAgendamento: "",
            IdStatusNavigation: "",

        };
    }

    buscarConsultasMedico() {
        Axios.get('http://192.168.3.216:5000/api/Consultas/consultaUsuario', {
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

    componentDidMount() {
        this.buscarConsultasMedico();
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
                        <h2 className="h1">Medico</h2>
                    </div>
                    <div className="navegaDiv">
                        <div className="direciona">
                            <i id="icon" class="fas fa-file-medical-alt"></i>
                            <a className="navega" href="http://localhost:3000/Paciente/Consultas">Consultas</a>
                        </div>
                        <div className="direciona">
                            <i id="icon" class="fas fa-sign-out-alt"></i>
                            <a className="navega" onClick={this.realizarLogout.bind(this)}>Sair</a>
                        </div>
                    </div>
                </div>
                <div id="Tabela" >
                    <div className="linhaTabela">
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Descrição</th>
                                        <th>Medico</th>
                                        <th>Prontuario</th>
                                        <th>Agendamento</th>
                                        <th>Status</th>
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


export default ConsultasProntuairo;