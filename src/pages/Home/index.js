import { useEffect, useState } from 'react'
import api from '../../services/api';
import { Link } from 'react-router-dom'
import './home.css';

// URL DA API : https://api.themoviedb.org/3/movie/now_playing?api_key=6172ce52b78bd185b74c4620691772d7&language=pt-br

function Home(){
    const [filmes, setFilme] = useState([]);
    const [loading, setLoading] = useState(true)


    useEffect(()=>{
        
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "6172ce52b78bd185b74c4620691772d7",
                    language: "pt-BR",
                    page: 1,
                }
            })

            //console.log(response.data.results.slice(0, 10));
            setFilme(response.data.results.slice(0, 10))
            setLoading(false);

        }

        loadFilmes();

    }, [])



    if(loading){
        return(
            <div className="loading">
                <h1>Carregando filmes...</h1>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;