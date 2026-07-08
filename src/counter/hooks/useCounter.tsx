import { useState } from "react";

//se declara una variable para pedirlo como prop con valor inicial por defecto
export const useCounter = (initialValue: number = 10) => {

    const [counter, setCounter] = useState(initialValue);

    const handlerAdd = () => {
        setCounter(counter + 1);
    }

    const handleSustract = () => {
        //prevState, se utiliza como auxiliar, para agarrar el estado actual de esa funcion del estado
        setCounter( prevState => prevState - 1 );
    }

    const handleReset = () => {
        setCounter(initialValue)
    }

    // Retornamos los datos y funciones que el componente utilizará
  return {
    //Prop o Values
    counter,

    //Methods o actions
    handlerAdd, 
    handleSustract,
    handleReset

  };//aqui podemos regresar lo que sea
}


//Esta es la funcion del useState creada por el equipo de react
// export const useState = (arg: string) => {
//     return [arg, () => {}]
// }