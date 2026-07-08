import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import  CustomHeader  from './CustomHeader';


describe('CustomHeader', ()=>{
    const text = 'El futuro es hoy';

    test('should render the title correctly', () => {
        render(<CustomHeader title={text} />);
        //screen.debug();
        expect(screen.getByText(text)).toBeDefined();
    });

    test('should render the description when provided', () => {
        const description = 'Este es un buen trabajo para practicar';

        render(<CustomHeader title={text} description={description}/>);
        //screen.debug();
        expect(screen.getByText(description)).toBeDefined();

        //otras opciones:
        //expect(screen.getByRole('paragraph')).toBeDefined();
        //expect(screen.getByRole('paragraph').innerHTML).toBe(description);
        
    });

    test('should render description when not provided', () => {
        //cuando no cambian desde su renderizacion el container queda mejor
        const { container } = render (<CustomHeader title={text}  />);

        const divElement = container.querySelector('.content-center');
        
        const h1 = divElement?.querySelector('h1');
        expect(h1?.innerHTML).toBe(text);

        const p = divElement?.querySelector('p');
        expect(p).toBeNull();
    });



})