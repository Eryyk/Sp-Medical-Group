import React, { Component } from 'react';
import ImgUser from "../../asses/img/Usuario.png";
import '../Estilos/Navegador.css';

class Admin extends Component {

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
                <div></div>
            </div>
        );
    }
}

export default Admin;