import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pagens/Login/App';
import Admin from './pagens/Admin/Admin';
import Medicos from './pagens/Admin/Medicos/Medicos';
import Prontruarios from './pagens/Admin/Prontruarios/Prontruarios';
import Consultas from './pagens/Admin/Consultas/Consultas';
import Pesquisa from './pagens/Admin/Pesquisa/Pesquisa';
import Medico from './pagens/Medico/Medico';
import ConsultasMedico from './pagens/Medico/ConsultasMedico/ConsultasMedicos';
import Paciente from './pagens/Paciente/Paciente';
import ConsultasPaciente from './pagens/Paciente/ConsultasProntuario/ConsultasProntuario';
import NaoEncontrada from './pagens/NaoEncontrada/NaoEncontrada';
import { Route, BrowserRouter as Router, Switch, } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { usuarioAutenticado } from "./services/auth";
import { parseJwt } from './services/auth';

//Verifica o JWT e o tipo Admin
const PermissaoAdmin = ({ component: Component }) => (
    <Route
        render={props =>
            usuarioAutenticado() && parseJwt().Role === "Admin" ? (
                <Component {...props} />
            ) : (
                    <Route to={{ pathname: "/Login" }} />
                )
        }
    />
);

//Verifica o JWT e o tipo Medico
const PermissaoMedico = ({ component: Component }) => (
    <Route
        render={props =>
            usuarioAutenticado() && parseJwt().Role === "Medico" ? (
                <Component {...props} />
            ) : (
                    <Route to={{ pathname: "/Login" }} />
                )
        }
    />
);

//Verifica o JWT e o tipo Paciente
const PermissaoPaciente = ({ component: Component }) => (
    <Route
        render={props =>
            usuarioAutenticado() && parseJwt().Role === "Paciente " ? (
                <Component {...props} />
            ) : (
                    <Route to={{ pathname: "/Login" }} />
                )
        }
    />
);

// exact = exatamente a rota

const rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <PermissaoAdmin exact path="/Admin" component={Admin} />
                <PermissaoAdmin path="/Admin/Medicos" component={Medicos} />
                <PermissaoAdmin path="/Admin/Prontruarios" component={Prontruarios} />
                <PermissaoAdmin path="/Admin/Consultas" component={Consultas} />
                <PermissaoAdmin path="/Admin/Pesquisa" component={Pesquisa} />
                <PermissaoMedico exact path="/Medico" component={Medico} />
                <PermissaoMedico path="/Medico/Consultas" component={ConsultasMedico} />
                <PermissaoPaciente exact path="/Paciente" component={Paciente} />
                <PermissaoPaciente path="/Paciente/Consultas" component={ConsultasPaciente} />


                <Route component={NaoEncontrada} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
