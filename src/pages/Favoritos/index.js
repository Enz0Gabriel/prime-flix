
import { useEffect, useState } from  'react'
import './favoritos.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Favoritos(){

    const [filmes, setFilmes] = useState([])

    useEffect(()=>{

        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || [])

    }, [])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter( (i) => {
            return (i.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes) )
        toast.success("Filme removido com sucesso")
    }

    return(
        <div className="meus-filmes">
            <h1>Meus filmes</h1>

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo na sua lista</span>}

            <ul>
                {filmes.map( (i) => {
                    return(
                        <li key={i.id}>
                            <span>{i.title}</span>

                            <div>
                                <Link to={`/filme/${i.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(i.id) }>Excluir</button>
                            </div>
                        </li>
                    )
                } )}
            </ul>
        </div>
    )
}

export default Favoritos;