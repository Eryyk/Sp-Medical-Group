import React, { Component } from 'react';
import { parseJwt } from '../../services/auth';
import Axios from 'axios';
import Logo from '../../asses/img/logo.png';
import Fundo from '../../asses/img/foto.jpg';
import '../Estilos/App.css';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            senha: ''
        }
    }

    atualizaEstadoEmail(event) {
        this.setState({ email: event.target.value });
    }

    atualizaEstadoSenha(event) {
        this.setState({ senha: event.target.value });
    }

    efetualLogin(event) {
        event.preventDefault();
        // alert(this.state.email + " - " + this.state.senha);
        Axios.post('http://192.168.3.216:5000/api/Login', { email: this.state.email, senha: this.state.senha })
            .then(data => {
                if (data.status === 200) {
                    console.log(data);
                    localStorage.setItem("usuario", data.data.token);
                    //Verifica o tipo de usuário e redireciona para a página default
                    console.log(parseJwt().Role);
                    if (parseJwt().Role === "Admin") {
                        this.props.history.push("/Admin");
                    } else if (parseJwt().Role === "Medico") {
                        this.props.history.push("/Medico");
                    } else {
                        this.props.history.push("/Paciente");
                    }
                }
            })
            .catch(erro => {
                this.setState({ erroMensagem: 'Email ou senha inválido' });
            })
    }
    render() {
        return (
            <div className="Login__Body">
                <div className="agoraVia">
                <div className="Spmedical">
                    <img className="Logo" src={Logo} />
                    <h2>Sp Medical Group</h2>
                </div>
                </div>
                <img className="fundo" src={Fundo}/>
                
                <div className="Login">
                    <div className="row">
                    <h1>Entrar</h1>
                        <form onSubmit={this.efetualLogin.bind(this)}>
                            <div className="item">
                                <input
                                    className="input__login"
                                    placeholder="email"
                                    type="text"
                                    value={this.state.email}
                                    onChange={this.atualizaEstadoEmail.bind(this)}
                                    name="email"
                                    id="login__email"
                                />
                            </div>
                            <div className="item">
                                <input
                                    className="input__login"
                                    placeholder="password"
                                    type="password"
                                    value={this.state.senha}
                                    onChange={this.atualizaEstadoSenha.bind(this)}
                                    name="password"
                                    id="login__password"
                                />
                            </div>
                            <p className="text__login" style={{ color: 'red', textAlign: 'center' }}>{this.state.erroMensagem}</p>
                            <div className="item">
                                <button tyoe="submit" className="btn__login" id="btn__login">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}