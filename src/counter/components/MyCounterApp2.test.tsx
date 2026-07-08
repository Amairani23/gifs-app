import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import MyCounterApp from "./MyCounterApp";

//esperamos que el habdleAdd sea llmada, pero como es anonima, se eleva la funcion afuera
const handleAddMock = vi.fn(); //se inicializan con vi.fn()
const handleSustractMock = vi.fn();
const handleResetMock = vi.fn();

//es util esta prueba para probas otros hook que dependan de otro hook
vi.mock('../hooks/useCounter', () => ({
    useCounter: () => ({
        counter:20,
        handlerAdd: handleAddMock, //se inicializan con vi.fn()
        handleSustract: handleSustractMock,
        handleReset: handleResetMock
    })
}));

describe('MyCounteApp2', () => {

    test('should render the component', () =>{
        render(<MyCounterApp/>);

        //screen.debug();

        expect(screen.getByRole('heading', {level:1}).innerHTML).toContain("counter:20");

        //diferentes maneras para tomar las piezas
        expect(screen.getByRole('button', {name: '+1'})).toBeDefined();
        expect(screen.getByRole('button', {name: '-1'})).toBeDefined();
        expect(screen.getByRole('button', {name: 'Reset'})).toBeDefined();
    });

    test('should call handleAdd if button is clicked', ()=>{

        render(<MyCounterApp/>);

        const button = screen.getByRole('button', {name: '+1'});

        fireEvent.click(button);

        expect(handleAddMock).toHaveBeenCalled();
        expect(handleAddMock).toHaveBeenCalledTimes(1);//las veces que han sido llamada la funcion
        expect(handleSustractMock).not.toHaveBeenCalled();//not: por que no ha sido llamado 
        expect(handleResetMock).not.toHaveBeenCalled();

    });


});