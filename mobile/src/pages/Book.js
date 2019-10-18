import React, { useState } from 'react';
import { Alert, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, AsyncStorage, View, Text } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }){

    const [date, setDate] = useState('');

    /* pegando o id do spot passado pela
    pagina passada */ 
    const spot_id = navigation.getParam('id');

    /* buscando o id do usuario do storage e 
    fazendo o booking com o spot_id e user_id.
    Navegando o usuario de volta pra lista de spots*/
    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${spot_id}/bookings`, {
            date
        }, {
            headers: { user_id }
        });

        Alert.alert('Solicitação de reserva enviada');

        navigation.navigate('List');

    }

    function handleCancel() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA *</Text>
            <TextInput 
                value={date}
                onChangeText={text => setDate(text)}
                style={styles.input}
                placeholder="Data da reserva "
                placeholderTextColor="#999"                    autoCapitalize="words"
                autoCorrect={false}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 30,

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
        marginTop: 50,
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },  

    cancelButton: {
        height: 42,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 10,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});