import React, { Component } from 'react';
import firebase from '../../../services/firebase';
import './Pesquisa.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class Pesquisa extends Component {

    constructor() {
        super();

        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            listaPesquisa: [],
            especialidade: '',
            descricao: '',
            idade: '',
            latitude: '',
            longitude: '',
            idPesquisa: 0
        }
    }

    displayMarkers = () => {
        return this.state.listaPesquisa.map((pesquisa) => {
            return <Marker key={pesquisa.id} position={{
                lat: pesquisa.latitude,
                lng: pesquisa.longitude
            }}
                onClick={() => console.log("You clicked me!")} />
        })
    }

    // onMarkerClick = (props, marker, e) =>
    //     this.setState({
    //         selectedPlace: props,
    //         activeMarker: marker,
    //         showingInfoWindow: true
    //     });

    // onMapClicked = (props) => {
    //     if (this.state.showingInfoWindow) {
    //         this.setState({
    //             showingInfoWindow: false,
    //             activeMarker: null
    //         })
    //     }
    // };

    listarPesquisaRealTime() {
        firebase.firestore().collection("pesquisa")
            .onSnapshot((pesquisa) => {
                let PesquisaArray = [];

                pesquisa.forEach((pesquisa) => {
                    PesquisaArray.push({
                        id: pesquisa.id,
                        descricao: pesquisa.data().descricao,
                        especialidade: pesquisa.data().especialidade,
                        idade: pesquisa.data().idade,
                        latitude: pesquisa.data().latitude,
                        longitude: pesquisa.data().longitude
                    })
                })

                this.setState({ listaPesquisa: PesquisaArray }, () => {
                    console.log(this.state.listaPesquisa);
                })
            })
    }

    listaPesquisa() {
        firebase.firestore().collection("pesquisa")
            .get()
            .then((pesquisa) => {
                let PesquisaArray = [];

                pesquisa.forEach((pesquisa) => {
                    PesquisaArray.push({
                        id: pesquisa.id,
                        descricao: pesquisa.data().descricao,
                        especialidade: pesquisa.data().especialidade,
                        idade: pesquisa.data().idade,
                        latitude: pesquisa.data().latitude,
                        longitude: pesquisa.data().longitude
                    })
                })

                this.setState({ listaPesquisa: PesquisaArray }, () => {
                    console.log(this.state.listaPesquisa);
                })
            });

    }

    componentDidMount() {
        this.listarPesquisaRealTime();
    }

    atualizaEstado(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    salvarPesquisa(event) {
        event.preventDefault();

        if (this.state.idPesquisa === 0) {
            firebase.firestore().collection("pesquisa")
                .add({
                    descricao: this.state.descricao,
                    especialidade: this.state.especialidade,
                    idade: this.state.idade,
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                }).then(() => {
                    alert("Pesquisa Cadastrado")
                    this.limparFormulario();
                }).catch((erro) => {
                    console.log('erro', erro);
                })
        } else {
            firebase.firestore().collection("pesquisa")
                .doc(this.state.idPesquisa)
                .set({
                    descricao: this.state.descricao,
                    especialidade: this.state.especialidade,
                    idade: this.state.idade,
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                }).then((result) => {
                    alert("Pesquisa Alterada");
                    this.limparFormulario()
                }).catch((erro) => {
                    console.log('erro', erro)
                })
        }
    }

    limparFormulario() {
        this.setState({
            especialidade: '',
            descricao: '',
            idade: '',
            latitude: '',
            longitude: '',

        })
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
                    <div id="TabelaP" >
                        <div className="linhaTabelaL">
                            <div className="containerPes" id="conteudoPrincipallista">
                                <div id="listaP">
                                    <h2>Pesquisa - Lista</h2>
                                    <ul>
                                        {
                                            this.state.listaPesquisa.map((pesquisa) => {

                                                return (

                                                    <li key={pesquisa.id}>
                                                        {pesquisa.id} - {pesquisa.descricao} - {pesquisa.especialidade} - {pesquisa.idade} - {pesquisa.latitude} - {pesquisa.longitude}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>

                                <h2>Pesquisas - Cadastrar</h2>
                                <form onSubmit={this.salvarPesquisa.bind(this)} >
                                    <div id="ind">
                                        <label>Descrição da Doença :</label>
                                        <input type="text" name="descricao" value={this.state.descricao} onChange={this.atualizaEstado.bind(this)} />
                                    </div>
                                    <div id="ind">
                                        <label>Especialidade do Medico : </label>
                                        <input type="text" name="especialidade" value={this.state.especialidade} onChange={this.atualizaEstado.bind(this)} />
                                    </div>
                                    <div id="ind">
                                        <label>Idade da Pessoa : </label>
                                        <input type="int" name="idade" value={this.state.idade} onChange={this.atualizaEstado.bind(this)} />
                                    </div>
                                    <div id="ind">
                                        <label>Latitude do Local :</label>
                                        <input type="text" name="latitude" value={this.state.latitude} onChange={this.atualizaEstado.bind(this)} />
                                    </div>
                                    <div id="ind">
                                        <label>Longitude do Local :</label>
                                        <input type="text" name="longitude" value={this.state.longitude} onChange={this.atualizaEstado.bind(this)} />
                                    </div>
                                    <button id="but" type="submit">Enviar</button>
                                </form>
                                <div className="map">
                                    <Map
                                        style={{ width: '100%', height: '100%', position: 'absolute' }}
                                        google={this.props.google}
                                        zoom={8}
                                        initialCenter={{ lat: -23.5504533, lng: -46.6514207 }}
                                        onClick={this.onMapClicked}>
                                        {/* <Marker onClick={this.onMarkerClick}
                        name={this.state.listaPesquisa.map((pesquisa) => {
                            return (
                                <li>
                                    {pesquisa.descricao} - {pesquisa.idade}
                                </li>
                            )
                        })} />
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow> */}
                                        {this.displayMarkers()}
                                    </Map>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: ("AIzaSyDVScf1zi9Rj4Y3OFObV1o7E6die6YIKMI")
})(Pesquisa)

