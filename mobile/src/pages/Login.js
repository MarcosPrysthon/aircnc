import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, Platform, KeyboardAvoidingView, StyleSheet,TouchableOpacity, TextInput, Image, Text } from 'react-native';

import api from '../services/api';
 
import logo from '../../assets/logo.png';

export default function Login({ navigation }){

    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    /* verificando se o usuario ja esta logado,
    se sim, manda direto para a pagina de lista
    de spost */
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user)  navigation.navigate('List');
        })
    }, []);

    /* fazendo a api call quando logar, guardando
    o id do usuario logado e suas tecnologias de 
    interesse e navegando para a pagina de listas
    de spots */
    async function handleSubmit(){
        const response = await api.post('/sessions', { email });

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView enable={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <Image source={logo} />

            <View style={styles.form}>
                <Text style={styles.label}>EMAIL *</Text>
                <TextInput 
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    placeholder="exemplo@gmail.com"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput 
                    value={techs}
                    onChangeText={text => setTechs(text)}
                    style={styles.input}
                    placeholder="Tecnlogias"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

/* parte de css no react native*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    }, 

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});