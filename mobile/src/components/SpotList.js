import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Image, Text, View, FlatList, TouchableOpacity }  from 'react-native';

import api from '../services/api';

function SpotList({ tech, navigation }){

    const [spots, setSpots] = useState([]);
    
    /* buscar do backend os spots que usam
    certa tecnologia e salvar no estado */
    useEffect(() => {
        async function loadSpots(){
            const response = await api.get('/spots', {
                params: { tech }
            })

            setSpots(response.data);
        }

        loadSpots();
    }, []);

    /* levando o usuario à pagina Book quando 
    clicar no botao de solicitar reserva e 
    mandando o id do spot escolhido para saber
    em que spot a reserva sera feita*/
    function handleNavigate(id){
        navigation.navigate('Book', { id });
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Empresas que usa <Text style={styles.bold}>{tech}</Text></Text>

        <FlatList 
            style={styles.list}
            data={spots}
            keyExtractor={spot => spot._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <View style={styles.listItem}>
                    <Image style={styles.thumbnail} source={{ uri: item.thumbnail_rul }}/>
                    <Text style={styles.company}>{item.company}</Text>
                    <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : `GRATUITO`}</Text>
                    <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                        <Text style={styles.buttonText}>Solicitar reserva</Text>    
                    </TouchableOpacity>
                </View>
            )}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    }, 

    title: {
        fontSize: 20,
        marginBottom: 15,
        color: '#444',
        paddingHorizontal: 20
    },

    bold: {
        fontWeight: 'bold',
    },

    list: {
        paddingHorizontal: 20,
    },

    listItem: {
        marginRight: 20,
    },

    thumbnail: {
        height: 120,
        width: 200,
        resizeMode: 'cover',
        borderRadius: 2,
    },

    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },

    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5,
    },

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
    }
});

export default withNavigation(SpotList);