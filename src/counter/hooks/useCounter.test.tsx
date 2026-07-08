import { act, renderHook } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useCounter } from './useCounter';

describe('useCuonter', () => {

    const initialValue = 10;

    test('should initialize with default value of 10', () => {
        //Para testear los Hooks, se utiliza "renderHook(()=> 'el nombre-del-hook que retorne')"
        //El "result": es el contenido del CustomHook, todo lo que el hook retorna
        const { result }  = renderHook(() => useCounter());

        //esperamos un 10, por que el valor inicial es 10 en su respectivo archivo
        expect(result.current.counter).toBe(10);
    });

    test('should initialize with default value of 20', () => {
        const initialValue = 20;//para inicializar manualmente para testing
        //Para testear los Hooks, se utiliza "renderHook()"
        //El "result": es el contenido del CustomHook, todo lo que el hook retorna
        const { result }  = renderHook(() => useCounter(initialValue));

        //esperamos un 10, por que el valor inicial es 10 en su respectivo archivo
        expect(result.current.counter).toBe(initialValue);
    });

    test('should increment counter when handleAdd is called', () => {
        const { result } = renderHook(()=> useCounter());

        //cuando testees el codigo que cambia el estado en React debes envolverlo en un act()
        //si la funcion de handleAdd(), fuera asincrona, entonces act(), tambien tendria que tener un async
        act(()=>{
            result.current.handlerAdd();
        })
        
        expect(result.current.counter).toBe(11);
    });

    test('should decrement counter when handleSustract is called', () => {
        const { result } = renderHook(()=> useCounter());

        act(()=>{
            result.current.handleSustract();
        })
        
        //el valor esperado es 9, por que 10, es el valor que damos por defecto
        expect(result.current.counter).toBe(9);
    });

    test('should reset to inicialValue the counter when handleReset is called', () => {
        const { result } = renderHook(()=> useCounter(initialValue));
        
        //mandamos a restar dos veces para que despues devuelva el valor inicial, solo para verificar que sea correcto
        act(()=>{
            result.current.handleSustract();
        })

        act(()=>{
            result.current.handleSustract();
        })

        act(()=>{
            result.current.handleReset();
        })
        
        expect(result.current.counter).toBe(initialValue);
    });



})