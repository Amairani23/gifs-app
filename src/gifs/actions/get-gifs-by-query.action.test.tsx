import { giphySearchResponseMock } from '../../../tests/mock/giphy.response.data';
import { beforeEach, describe, expect, test, vi } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";

import AxiosMockAdapter from 'axios-mock-adapter';
import { giphyApi } from "../api/giphy.api";

describe('getGifsByQuery', () => {

    //mandar a llamar una instancia del mock
    let axiosMock = new AxiosMockAdapter(giphyApi);

    beforeEach(() => {
        //axiosMock.reset();
        axiosMock = new AxiosMockAdapter(giphyApi);
    });


    //Pruebas sobre acciones
    //test('should retunr a list of gifs', async () => {
        // const gifs = await getGifsByQuery('goku');
        // const [ gif1 ] = gifs;
        //console.log(gif1)

        //console.log para ver los datos que nos manda, los copiamos y los agregamos a test/mock/gifs.data.ts, para pruebas futuras
        //console.log(gifs);

        //esta prueba es un id por uno 
        // expect(gif1).toEqual({
        //     id: expect.any(String),
        //     title: expect.any(String),
        //     url: expect.any(String),
        //     width: expect.any(Number),
        //     height: expect.any(Number),
            
        // })

        //esta prueba es para todos los ids
        // expect(gifs.length).toBe(10);

        // expect(gif1).toStrictEqual({
        //     id: expect.any(String),
        //     title: expect.any(String),
        //     url: expect.any(String),
        //     width: expect.any(Number),
        //     height: expect.any(Number),
            
        // })
    //});

    //Axios mock adapter - controlar resultados de Axios
    test('should retunr a list of gifs', async () => {

        //necesitamos instalar: npm install axios-mock-adapter --save-dev, por que solo se usara en el testing

        //search: por que esta llamando a esta en get gitfs
        axiosMock.onGet('/search').reply(200, giphySearchResponseMock);

        const gifs = await getGifsByQuery('goku');

        //console.log(gifs);

        expect(gifs.length).toBe(10);

        gifs.forEach(gif => {
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.title).toBe('string');
            expect(typeof gif.url).toBe('string');
            expect(typeof gif.width).toBe('number');
            expect(typeof gif.height).toBe('number');
        })

    });

    test('should retunr a list of gifs', async () => {

        //search: por que esta llamando a esta en get gitfs
        //axiosMock.onGet('/search').reply(200, {giphySearchResponseMock});
        axiosMock.restore(); //restore, restaura toda la instancia y quita lo que esta ensima de axios

        const gifs = await getGifsByQuery('');

        //console.log(gifs);

        expect(gifs.length).toBe(0);
    });

    //como se hace para simular un error
    test('should retunr a list of gifs', async () => {

        //agregar espia: para espiar el comportamiento de algo
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation( () => {
            //console.log("Hola"); se manda el callback solo
        } );

        axiosMock.onGet('/search').reply(400, {
            data: {
                message: 'Bad Request',
            }
        });

        const gifs = await getGifsByQuery('goku');
        //console.log(gifs);

        expect(gifs.length).toBe(0);
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenLastCalledWith(expect.anything());

    });


});