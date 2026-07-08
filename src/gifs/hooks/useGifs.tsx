import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

//Record es un tipo de utilidad (Utility Type) que permite definir la estructura de un objeto donde especificas el tipo de las claves (keys) y el tipo de los valores. Su sintaxis es Record<TipoClave, TipoValor> 
    //solo lo usamos como un stado en cache
    //const gifsCache: Record<string, Gif[]> = {}
    //en lugar de este es useRef()

const useGifs = () => {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    //useRef: nos crea un espacio en memora que no causa renders, mantiene el estado a lo largo de diferentes re-render
    const gifsCache = useRef<Record<string, Gif[]>>({});

    //handle: manejar
    const handleTermClicked = async (term:string) => {
        //console.log({term});

        if(gifsCache.current[term]){
            setGifs(gifsCache.current[term]);//mostrar los gifs
            return;
        }

        const gifs = await getGifsByQuery(term);
        setGifs(gifs);//mostrar los gifs
        gifsCache.current[term] = gifs;
    }

    const handleSearch = async (query: string = '') => {
        //console.log({query})
        //Convertir el query a minúsculas y eliminar espacios en blanco
        query = query.toLowerCase().trim();
        //Validar que el query no esté vacío
        if(query.length === 0)return;
        //Evitar búsquedas duplicadas verificando si el término ya existe en previousTerms ( si existe, no hacer nada )
        if(previousTerms.includes(query)) return;
        //Actualizar previousTerms agregando el nuevo término al inicio y limitando a 8 elementos máximo, es decir no puede ser un arreglo de más de 8.
        setPreviousTerms([query, ...previousTerms].splice(0,8));

        const gifs = await getGifsByQuery(query);
        setGifs(gifs);//mostrar los gifs

        gifsCache.current[query] = gifs;
    }

  return {
    //Prop
    gifs,
    previousTerms,
    //methos
    handleTermClicked,
    handleSearch
  }
}

export default useGifs;
