import React, { Component } from 'react';
import Axios from 'axios';
import '../../Estilos/Navegador.css';
import '../../Estilos/Tabelas.css';

class Medicos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaEspecialidade: [],
            listaMedico: [],
            listaClinica: [],
            listaUsuario: [],
            crm: "",
            IdEspecialidadeNavigation: "",
            IdClinicaNavigation: "",
            IdUsuarioNavigation: "",
            Consulta: [],
            Especialidade: "",
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

    buscarClinicas() {
        Axios.get('http://192.168.3.216:5000/api/Clinicas', {
            headers:
            {
                "Authorization": 'Bearer ' + localStorage.getItem('usuario')
            }
        })
            .then(data => {
                console.log(data.data);
                this.setState({ listaClinica: data.data })
            })
    }

    buscarEspecialidades() {
        Axios.get('http://192.168.3.216:5000/api/Especialidade', {
            headers:
            {
                "Authorization": 'Bearer ' + localStorage.getItem('usuario')
            }
        })
            .then(data => {
                console.log(data.data);
                this.setState({ listaEspecialidade: data.data })
            })
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

    componentDidMount() {
        this.buscarMedicos();
        this.buscarEspecialidades();
        this.buscarClinicas();
        this.buscarUsuarios();
    }

    atualizaEstadoCrm(event) {
        this.setState({ crm: event.target.value });
    }

    atualizaEstadoIdEspecialidadeNavigation(event) {
        this.setState({ IdEspecialidadeNavigation: event.target.value });
    }

    atualizaEstadoIdClinicaNavigation(event) {
        this.setState({ IdClinicaNavigation: event.target.value });
    }

    atualizaEstadoIdUsuarioNavigation(event) {
        this.setState({ IdUsuarioNavigation: event.target.value });
    }

    cadastraMedico(event) {
        event.preventDefault();

        let medico = {
            crm: this.state.crm,
            IdEspecialidadeNavigation: this.state.idEspecialidadeNavigation.especialidade,
            IdClinicaNavigation: this.state.idClinicaNavigation.nome,
            IdUsuarioNavigation: this.state.idUsuarioNavigation.nome
        };

        console.log(medico);

        Axios.post("http://192.168.3.216:5000/api/Medico");
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
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>crm</th>
                                        <th>Especialidade</th>
                                        <th>Clinica</th>
                                        <th>Usuario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.listaMedico.map(function (medicos) {
                                            return (
                                                <tr key={medicos.id}>
                                                    <td>{medicos.id}</td>
                                                    <td>{medicos.crm}</td>
                                                    <td>{medicos.idEspecialidadeNavigation.especialidade}</td>
                                                    <td>{medicos.idClinicaNavigation.nome}</td>
                                                    <td>{medicos.idUsuarioNavigation.nome}</td>

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
export default Medicos;