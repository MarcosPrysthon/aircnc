import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import './styles.css';

export default function Dashboard({ history }){
    const [spots, setSpots] = useState([]);


    function handleClick() {
        history.push('/new');
    }

    /* fazendo listagem dos spots de um usuario*/
    /* funçao useEffect é responsavel por fazer o load
    da lista de spots assim que a pagina for carregada*/
    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            
            setSpots(response.data);
        }

        loadSpots();
    }, []);

    /* utilizando o componente Link do react
    router dom para ir para a pagina de criar
    novo spot*/ 
    return (
        <>  
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : `GRATUITO`}</span>
                    </li>
                ))}
            </ul>

           <button 
            className="btn"
            onClick={handleClick}
            >Cadastrar novo spot</button>
        </>
    );
}