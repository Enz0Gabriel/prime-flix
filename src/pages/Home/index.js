import { useEffect, useState } from 'react'
import api from '../../services/api';

//URL DA API: /movie/now_playing?api_key=6172ce52b78bd185b74c4620691772d7&language=pt-BR

function Home (){
    const [filmes, setFilmes] = useState([]);


    useEffect(()=>{

        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key:"6172ce52b78bd185b74c4620691772d7",
                    lenguage: "pt-BR",
                    page: 1,
                }
            })

            console.log(response.data.results);

        }

        loadFilmes();

    }, [])

    return(
        <div>
            <h1>BEM VINDO A HOME</h1>
        </div>
    )
}

export default Home;