import React, { useEffect, useState } from 'react'


import axios from 'axios';
import ProfileImg from '../../images/people.jpg';
import {Link} from 'react-router-dom'
export default function Movies() {

  let imgPath = "https://image.tmdb.org/t/p/w500"
  const [moviesList, setmoviesList] = useState([])
  const [tvList, settvList] = useState([])
  const [PeopleList, setPeopleList] = useState([])

  async function getTranding(mediaType, callback) {
    let { data } = await axios(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=8613e4e1776af4e8633cc311d67b3e09`)
    callback(data.results.slice(0, 10))

  }


  useEffect(() => {
    getTranding('movie', setmoviesList)
    getTranding('tv', settvList)
    getTranding('person', setPeopleList)
  }, [])
  return (
    <div className='container'>

      <div className='row g-3'>

        <div className='col-md-4 py-5'>
          <div className='w-25 brd mt-5'></div>
          <h2 className='py-3'>Tranding Movies To Watch Now</h2>
          <div className='w-75 brd'></div>
        </div>
        {moviesList.map((movie, i) => <div key={i} className='col-md-2'>
          <Link to={`/moviedetails/${movie.id}`}>
            <div className='item position-relative'>
              <img src={imgPath + movie.poster_path} className='w-100' alt="" />
              <h6>{movie.title}</h6>
              <div className='position-absolute top-0 end-0 bg-info p-2'>
                {movie.vote_average.toFixed(1)}
              </div>
            </div>
          </Link>
        </div>)}
      </div>

      <div className='row g-3 my-5'>

        <div className='col-md-4 py-5'>
          <div className='w-25 brd mt-5'></div>
          <h2 className='py-3'>Tranding tv To Watch Now</h2>
          <div className='w-75 brd'></div>
        </div>
        {tvList.map((tv, i) => <div key={i} className='col-md-2'>
          <div className='item position-relative'>
            <img src={imgPath + tv.poster_path} className='w-100' alt="" />
            <h6>{tv.name}</h6>
            <div className='position-absolute top-0 end-0 bg-info p-2'>
              {tv.vote_average.toFixed(1)}
            </div>
          </div>
        </div>)}
      </div>

      <div className='row g-3 '>

        <div className='col-md-4 py-5'>
          <div className='w-25 brd mt-5'></div>
          <h2 className='py-3'>Tranding People To Watch Now</h2>
          <div className='w-75 brd'></div>
        </div>
        {PeopleList.map((person, i) => <div key={i} className='col-md-2'>
          <div className='item position-relative'>

            {person.profile_path ? <img src={imgPath + person.profile_path} className='w-100' alt="" /> : <img src={ProfileImg} className='w-100' alt="" />}

            <h6>{person.name}</h6>
            

          </div>
        </div>)}
      </div>
    </div>
  )
}



