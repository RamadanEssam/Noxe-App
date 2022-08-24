import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
export default function Moviedetails() {

    let imgPath = "https://image.tmdb.org/t/p/w500"

    const [movie, setmovie] = useState({})
    let { id } = useParams()
    async function getMovieDetails() {
        let { data } = await axios(`https://api.themoviedb.org/3/movie/${id}?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US`)
        setmovie(data)
    }

    useEffect(() => {
        getMovieDetails()
    }, [])
    return (
        <div>

            <img src={imgPath + movie.poster_path} alt="" />


        </div>
    )
}
