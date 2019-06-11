import React, { Component } from 'react';
import '../../Estilos/Medico.css';
import '../../Estilos/Navegador.css';
import '../../Estilos/Tabelas.css';
import Axios from 'axios';

class ConsultasMedicos extends Component {
    constructor() {
        super();
        this.state = {
            listaConsultas: [],
            descricao: "",
            idMedico: "",
            idMedicoNavigation: "",
            idProntuario: "",
            idUsuario: "",
            dataAgendamento: "",
            idStatus: ""

        };
    }
    realizarLogout() {
        localStorage.clear();
        window.location.href = '/';
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

    CadastrarDescricao(event) {
        event.preventDefault();
        const IdMedico = (event.target.getAttribute('IdMedico'))
        const idConsulta = (event.target.getAttribute('idConsulta'))
        console.log(event.target)
        let consulta = {
            idMedico: IdMedico,
            descricao: this.state.descricao
        }
        Axios.put(`http://192.168.3.216:5000/api/consultas/descricao/` + idConsulta, consulta, {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('usuario')
            }

        }
        )
            .then(_res => {
                this.buscarConsultas()
            })

    }

    atualizaEstadoDescricao(event) {
        this.setState({ descricao: event.target.value })
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
                            <a className="navega" href="http://localhost:3000/Medico/Consultas">Consultas</a>
                        </div>
                        <div className="direciona">
                            <i id="icon" class="fas fa-sign-out-alt"></i>
                            <a className="navega" onClick={this.realizarLogout.bind(this)}>Sair</a>
                        </div>
                    </div>
                </div>
                <div id="Tabela" >
                    <div className="linhaTabela">
                        <div className="containerM" id="conteudoPrincipal-lista">
                            <h2>Suas Consultas</h2>
                            <div id="TabelaAB" >
                                <div className="linhaTabela">
                                    <div className="containerM" id="conteudoPrincipal-lista">
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
                            <h2>Atualiza Descrição</h2>
                            <div id="TabelaAB" >
                                <div className="linhaTabela">
                                    <div className="containerM" id="conteudoPrincipal-lista">
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
                                            <tbody >
                                                {
                                                    this.state.listaConsultas.map(consulta => {
                                                        return (
                                                            <tr className="consulta--listar__tabela-tr-dados" key={consulta.id} id={consulta.id}>
                                                                <td >{consulta.id}</td>
                                                                <td  >
                                                                    <input
                                                                        type="text"
                                                                        value={this.state.nome}
                                                                        onChange={this.atualizaEstadoDescricao.bind(this)}
                                                                        placeholder="Insira uma descricão"
                                                                    />
                                                                    <button type="submit" IdMedico={consulta.idMedico} idConsulta={consulta.id} onClick={this.CadastrarDescricao.bind(this)} >
                                                                        Cadastrar
                                                    </button>
                                                                </td>
                                                                <td>{consulta.idMedicoNavigation.idUsuarioNavigation.nome}</td>

                                                                <td  >{consulta.idProntuarioNavigation.idUsuarioNavigation.nome}</td>
                                                                <td  >{consulta.dataAgendamento}</td>
                                                                <td  >{consulta.idStatusNavigation.tipoConsulta}</td>
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
                    </div>
                </div>
            </div>
        );
    }
}


export default ConsultasMedicos;