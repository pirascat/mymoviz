import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useState, useEffect} from 'react';
import Header from './Header'
import Movie from "./Movie"

function App() {
  const movieList = []
  // const movieStructure = [{
  //   name : "Star-Wars : L'Ascension de Skywalker",
  //   desc : "La conclusion de la saga Skywalker. De nouvelles légendes vont naître dans cette ...",
  //   img : "../starwars.jpg",
  //   note : 10,
  //   vote : 8,
  // },{
  //   name : "Maléfique : Le Pouvoir du Mal",
  //   desc : "Plusieurs années après avoir découvert pourquoi la plus célèbre méchante Disney avait un coeur ...",
  //   img : "../maleficent.jpg",
  //   note : 10,
  //   vote : 8,
  // },{
  //   name : "Jumanji : The Next Level",
  //   desc : "L'équipe est de retour mais le jeu a changé. Alors qu'ils retournent dans Jumanji pour secourir ...",
  //   img : "../jumanji.jpg",
  //   note : 10,
  //   vote : 8,
  // },{
  //   name : "Bad Boys 3",
  //   desc : "brrrrrrrrrr",
  //   img : "../badboy3.jpg",
  //   note : 10,
  //   vote : 8,
  // },{
  //   name : "Once Upon a Time in Hollywood",
  //   desc : "Cascades",
  //   img : "../once_upon.jpg",
  //   note : 10,
  //   vote : 8,
  // },{
  //   name : "Terminator",
  //   desc : "KR KR y'a le pompe",
  //   img : "../terminator.jpg",
  //   note : 10,
  //   vote : 8,
  // }]

  const [compteur, setCompteur] = useState(0)
  const [wishList,setWishList] = useState([])
  const [imgWishlist, setImgWishlist] = useState([])
  const [movieStructure, setMovieStructure] = useState([])
  const [dataStatus, setDataStatus] = useState("loading...")

  console.log("MOVIESTRUCTURE #1",movieStructure)

  useEffect(() => {
    async function loadData() {
      const url = '/new-movies'
      const rawBackendResponse = await fetch(url)
      const backendResponse = await rawBackendResponse.json()
      const urlWish = '/wishlist-beginning'
      const rawBackendResponseWish = await fetch(urlWish)
      const backendResponseWish = await rawBackendResponseWish.json()
      setDataStatus('')
      setMovieStructure(backendResponse)
      setWishList(backendResponseWish)
      setCompteur(backendResponseWish.length)
    }
    loadData()
  }, [])

  const handleClickLike = async (isLiked, name, img, desc, rating, ratingNumber) =>{
    if (isLiked){
      setCompteur(compteur + 1)
      setWishList([...wishList,{name, img}])
      await fetch('/wishlist-movie',{
        method : "POST",
        headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
        body :`name=${name}&img=${img}&desc=${desc}&note=${rating}&note_count=${ratingNumber}`
      })
    } else {
      setCompteur(compteur - 1)
      setWishList(wishList.filter((movie) => (movie.name !== name)))
      await fetch(`/delete-movie/${name}`,{
        method : "DELETE"
      })
    }
  }
  if(movieStructure.results){
    for (let i = 0; i<movieStructure.results.length; i++){
      let movie = movieStructure.results[i]
      console.log("MOVIE",movie)
      movieList.push(<Movie 
        movieName = {movie.original_title} 
        movieDesc = {movie.overview} 
        movieImg = {`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        globalRating = {movie.vote_average} 
        globalCountRating = {movie.vote} 
        handleClickLikeParent = {handleClickLike}/>)
    }
  }
  return (
    <div className = "container" style = {{backgroundColor : "#3d3d3d"}}>
      <div className = "row">
        <Header compteurWishlist = {compteur} myWishList = {wishList} myImgWishList ={imgWishlist}/>
      </div>
      <div className = "row">
        {movieList}
        <h1>{dataStatus}</h1>
      </div>
    </div>
  );
}

export default App;
