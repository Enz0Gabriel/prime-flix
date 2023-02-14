import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme-info.css';
import api from '../../services/api'

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "6172ce52b78bd185b74c4620691772d7",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("FILME NÃO ENCONTRADO")
                navigate("/", { replace: true });
                return;
            })
        }

        loadFilme();


        return () => {
            console.log("COMPONENTE FOI DESMONTADO")
        }
    }, [navigate, id])

    if(loading){
        return(
            <div className="filme-info">
                <h2>Carregando detalhes...</h2>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>

        <div className="area-buttons">
            <button>Salvar</button>
            <button>
                <a target="_blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>
                    Trailer
                </a>
            </button>
        </div>

        </div>
    )
}

export default Filme;