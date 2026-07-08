import { useCounter } from "../hooks/useCounter" //se importa el hook


export default function MyCounterApp() {
	//se hace una desestructuración por que se retorno un objeto en la función
    const {counter, handlerAdd, handleSustract, handleReset} = useCounter();

//listos para usarse en la interfaz
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        
        <h1>counter:{counter}</h1>

        <div style={{display: 'flex', gap: '10'}}>
            <button onClick={handlerAdd}>+1</button>
            <button onClick={handleSustract}>-1</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    
    </div>
  )
}
