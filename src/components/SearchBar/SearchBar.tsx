import { useEffect, useState } from "react";

interface SearchBar {
    placeholder?: string;

    onQuery: (query:string) => void;
}
//{placeholder = 'Buscar'}: SearchBar: valor por defecto
export default function SearchBar({placeholder = 'Buscar', onQuery}: SearchBar) {

   const [query, setQuery] = useState('');

   //useEfect: solo necesita realizar una tarea en especifico
   useEffect(()=>{
    //onQuery(query);
    const timeoutId = setTimeout(()=>{
        onQuery(query)
    }, 700)//que se emita el onQuery, cada 700 milesimas de segundo para imprimir el evento

    return ()=>{
        //console.log("funcion de limpieza");
        clearTimeout(timeoutId)
    }
   },[query, onQuery]);

   const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setQuery(event.target.value);
   }

   const handleSeacrh = () => {
    onQuery(query);
    setQuery('');//para limpiar el espacio
   }
   //React.KeyboardEvent<HTMLInputElement>: sale si directamente agregar "event" en en html, y pasas el cursor ensima del "event", te da el tipo
   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            handleSeacrh();
           }
   }

  return (
    <>
    <div className="search-container">
        {/* {<h1>{query}</h1>} : el query tiene el valor de la caja de texto*/} 
        <input 
        type="text" 
        placeholder={placeholder}
        value={query}//input controlado, va a manejar el valor = query
        onChange={handleQueryChange}//se dispara cuando el valor de un elemento cambia
        onKeyDown={handleKeyDown}//para saber que letra preciona el usuario
        />
        <button onClick={handleSeacrh}>Buscar</button>
    </div>
    
    </>
  )
}
