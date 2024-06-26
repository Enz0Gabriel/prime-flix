import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme-info.css';
import api from '../../services/api';
import { toast } from 'react-toastify';

function Filme (){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilmes(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key:"6172ce52b78bd185b74c4620691772d7",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("FILME NÃO ENCONTRADO")
                navigate("/", { replace: true })
                return;
            })
        }

        loadFilmes();


        return () => {
            console.log("COMPONENTE FOI DESMONTADO")
        }
    }, [navigate, id])


    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix")

        let filmeSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmeSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("Esse filme já está na sua lista!")
            return;
        }

        filmeSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmeSalvos))
        toast.success("Filme salvo com sucesso!")

    }

    if(loading){
        <div className="filme-info">
            <h1>Carregando detalhes...</h1>
        </div>
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>           
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}

export default Filme;