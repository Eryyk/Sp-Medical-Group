import React, { Component } from "react";

import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from "react-native";

import api from "../services/api";

class Login extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = { Email: "", Senha: "" };
    }

    realizarLogin = async () => {
        // console.warn(this.state.email + this.state.senha);

        const resposta = await api.post("/Login", {
            Email: this.state.Email,
            Senha: this.state.Senha
        });

        // console.warn(token);
        const token = resposta.data.token;
        await AsyncStorage.setItem("userToken", token);
        this.props.navigation.navigate("ConsultaUsuario");
    };

    render() {
        return (
            <View style={styles.main}>
                <View style={styles.img}>
                    <Image style={styles.loginImg}
                        source={require("../Imagens/logo.png")}
                    />
                </View>
                <Text style={styles.Titulo}>Sp Medical Group</Text>
                <TextInput
                    style={styles.loginInput}
                    placeholder="email"
                    placeholderTextColor="#FFFFFF"
                    underlineColorAndroid="#FFFFFF"
                    onChangeText={Email => this.setState({ Email })}
                />
                <TextInput
                    style={styles.loginInput}
                    secureTextEntry= {true}
                    placeholder="senha"
                    placeholderTextColor="#FFFFFF"
                    password="true"
                    underlineColorAndroid="#FFFFFF"
                    onChangeText={Senha => this.setState({ Senha })}
                />
                <TouchableOpacity
                    style={styles.loginEntrar}
                    onPress={this.realizarLogin}
                >
                    <Text style={styles.btnLoginText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#02AAC6",
        alignItems: "center",
        flex: 1,
        padding: 30
    },
    loginImg: {
        marginTop: 35,
        width: 168,
        height: 180
    },
    loginInput: { 
        textDecorationColor: "#BEB2D7",
        margin: 8,
        fontSize: 18,
        width: 300,
        color: "white"

    },
    loginEntrar: {
        borderColor: "#BEB2D7",
        borderWidth: 1 ,
        justifyContent: "center",
        backgroundColor: "#00EFEF",
        alignItems: "center",
        borderRadius: 10,
        width: 200,
        margin: 15,
        fontSize: 40,
        height: 45
    },
    Titulo: {
        marginTop: 20,
        color: "white",
        textAlign: "center",
        fontSize: 30,
        width: 200,
        height: 100
    },
    btnLoginText: {
        fontSize: 20,
        color: "white"
    }
});

export default Login;
