//import { useState } from "react";
import {GifList} from "../gifs/components/GifList/GifList";
import PreviousSearches from "../gifs/components/PreviousSearches/PreviousSearches";
//import { mockGifs } from "../mock-data/gifs.mock";
import CustomHeader from "./CustomHeader/CustomHeader";
import SearchBar from "./SearchBar/SearchBar";
import useGifs from "../gifs/hooks/useGifs";
//import { getGifsByQuery } from '../gifs/actions/get-gifs-by-query.action';
//import type { Gif } from '../gifs/interfaces/gif.interface';


export default function GifsApp() {
  
  const {gifs, previousTerms, handleTermClicked, handleSearch} = useGifs();

  return (
    <>
    
    <CustomHeader title="Búscadr de Gifs" description="Descubre y comparte el gif perfecto"/>

    {/* Search */}
    <SearchBar placeholder="Buscar gifss" onQuery={handleSearch}/>

    {/* Búsquedas previas */}
    <PreviousSearches searches={previousTerms} onLabelClicked ={handleTermClicked}/>

    {/* Gifs */}
    <GifList gifs={gifs}/>
    
    </>
  )
}
