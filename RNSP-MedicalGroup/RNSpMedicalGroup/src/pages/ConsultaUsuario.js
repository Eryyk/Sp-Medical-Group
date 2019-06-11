import React from 'react';
import { Component } from 'react';
import style from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage, TouchableOpacity} from "react-native";
import api from "../services/api";
import jwt from "jwt-decode";

class ConsultasUsuario extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            listaConsultasUsuario: []
        };
    };

    desfazerLogin = async () => {
        // console.warn(token);
        await AsyncStorage.removeItem("userToken");
        this.props.navigation.navigate("AuthStack");
    };

    componentDidMount() {
        this.carregaToken();

    };

    carregaToken = async () => {
        await AsyncStorage.getItem("userToken").then((token) => {
            this.setState({ token: token }, () => {
                this.carreagarConsultas();
                this.buscarDados();
            });

        });
    }

    buscarDados = async () => {
        try {
            const value = await AsyncStorage.getItem("userToken");
            if (value !== null) {
                this.setState({ idUsuario: jwt(value).idUsuario });
                this.setState({ token: value });
            }
        } catch (error) { }
    };

    carreagarConsultas = async () => {
        const usertoken = this.state.token;
        const resposta = await api.get("/Consultas/consultaUsuario", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + usertoken
            }
        });
        const dadosDaApi = resposta.data;
        this.setState({ listaConsultasUsuario: dadosDaApi });
    };

    render() {
        return (
            <View style={styles.Body}>
                <View>
                    <Text style={styles.Titulo}>Suas Consultas</Text>
                </View>
                <TouchableOpacity
                    style={styles.deslogar}
                    onPress={this.desfazerLogin}
                >
                    <Text style={styles.btnTextSair}>Sair</Text>
                </TouchableOpacity>
                <FlatList style={styles.dados}
                    contentContainerStyle={styles.appTableConteudo}
                    data={this.state.listaConsultasUsuario}
                    renderItem={this.renderizaItem}
                />
            </View>
        );
    }
    renderizaItem = ({ item }) => (
        <View style={style.itemsCon}>
            <View style={styles.ItemContainer}>
                <View style={styles.medicoCon}>
                    <Text style={styles.textoT}>Medico:</Text>
                    <Text style={styles.texto}>{item.idMedicoNavigation.idUsuarioNavigation.nome}</Text></View>
                <View style={styles.pacienteCon}>
                    <Text style={styles.textoT}>Paciente:</Text>
                    <Text style={styles.texto}>{item.idProntuarioNavigation.idUsuarioNavigation.nome}</Text></View>
                <View style={styles.descricaoCon}>
                    <Text style={styles.textoT}>Descrição:</Text>
                    <Text style={styles.textoD}> {item.descricao}</Text></View>
                <View style={styles.dataCon}>
                    <Text style={styles.textoT}>Data de Agendamento:</Text>
                    <Text style={styles.texto}>{item.dataAgendamento}</Text></View>
                <View style={styles.statusCon}>
                    <Text style={styles.textoT}>Estado da Consulta:</Text>
                    <Text style={styles.texto}>{item.idStatusNavigation.tipoConsulta}</Text>
                </View>
            </View>
            <View style={styles.linhaD}></View>
        </View>
    )
}
const styles = StyleSheet.create({
    deslogar: {
        borderRadius: 5,
    },
    btnTextSair: {
        backgroundColor:"#00EFEF",
        borderRadius: 8,
        width: 90,
        height: 30,
        fontSize: 20,
        textAlign: "center"
    },
    Titulo: {
        marginTop: 20,
        color: "#FFFFFF",
        fontSize: 40,
        width: "100%",
        height: 100
    },
    Body: {
        textAlign: "center",
        alignItems: "center",
        backgroundColor: "#0196B2",
        flex: 1
    },
    itemsCon: {
        fontSize: 25,
        margin: 10,
        alignItems: "center",
    },
    textoT: {
        marginRight: 10,
        fontSize: 18,
        color: "#FFFFFF"
    },
    texto: {
        fontSize: 18,
        color: "#FFFFFF"
    },
    textoD: {
        fontSize: 18,
        color: "#016679",
        backgroundColor: "#86E9FC",
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#042A32",
    },
    medicoCon: {
        display: "flex",
        flexDirection: "row"
    },
    pacienteCon: {
        display: "flex",
        flexDirection: "row"
    },
    dataCon: {
        display: "flex",
        flexDirection: "row"
    },
    statusCon: {
        display: "flex",
        flexDirection: "row"
    },
    ItemContainer: {
        marginBottom: 20
    },
    linhaD: {
        width: "100%",
        marginTop: 4,
        borderWidth: 1,
        backgroundColor: "#000000"
    },
    itemsCon: {
        width: "95%",
    },
    dados: {
        width: "95%",
    },
    ItemContainer: {
        padding: 15
    },
});
export default ConsultasUsuario;