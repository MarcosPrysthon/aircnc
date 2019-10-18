import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView ,StyleSheet ,Image, Text, View, AsyncStorage } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../../assets/logo.png';


export default function List(){

    const [techs, setTechs] = useState([]);

    /* pegando as techs que o usuario tem interesse
    para mostrar em tela*/
    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArr = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArr);
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 30,
    }
})