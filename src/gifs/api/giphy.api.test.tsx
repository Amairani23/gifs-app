import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";

//Pruebas subre instancias de Axios

describe('giphyApi', () => {

    test('should be configured correctly', () => {
        const params = giphyApi.defaults.params;
        console.log(params); //igual se verifica la estructura
        //console.log(giphyApi.defaults);, verificar la estructura
        expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');

        //toBe: se usa para primitivos
        expect(params.lang).toBe('es');
        expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY);

        //toStrictEqual: se usa para evaluar objetos
        expect(params).toStrictEqual({
            lang: 'es',
            api_key: import.meta.env.VITE_GIPHY_API_KEY,
        });

    });


});