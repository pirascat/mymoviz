import {Card, CardImg, CardText, CardBody, ButtonToggle, Badge} from 'reactstrap';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faHeart, faStar } from '@fortawesome/free-solid-svg-icons'

function Movie(props){
  let [likeMovie,setLikeMovie] = useState(false)
  let [watchMovie, setWatchMovie] = useState(false)
  let [countWatchMovie, setCountWatchMovie] = useState(0)
  let [myRatingMovie, setMyRatingMovie] = useState(0)
  let [globalRatingVoted, setGlobalRatingVoted] = useState(false)
  let [globalRatingNumber, setGlobalRatingNumber] = useState(3)
  let [globalRating, setGlobalRating] = useState(5)

  const handleLike= () => {
    setLikeMovie(!likeMovie)
    props.handleClickLikeParent(!likeMovie, props.movieName, props.movieImg, props.movieDesc, myRatingMovie, globalRatingNumber)
  }
  const handleWatch= () => {
    setWatchMovie(true)
    setCountWatchMovie(countWatchMovie + 1)
  }

  const handleRateDown = () => {
    let oldVoters = globalRatingNumber
    if(myRatingMovie > 0){
      const newRatingMovie = myRatingMovie - 1
      setMyRatingMovie(newRatingMovie)
      if(!globalRatingVoted){
        setGlobalRatingVoted(true)
        setGlobalRatingNumber(globalRatingNumber +1)
        setGlobalRating(Math.round(globalRating*oldVoters + newRatingMovie)/(oldVoters +1))
      }
      if(globalRatingVoted){
        setGlobalRating((globalRating*globalRatingNumber - 1)/globalRatingNumber)
      }
    }
  }

  const handleRateUp = () => {
    let oldVoters = globalRatingNumber
    if(myRatingMovie < 10){
      const newRatingMovie = myRatingMovie + 1
      setMyRatingMovie(newRatingMovie)
      if(!globalRatingVoted){
        setGlobalRatingVoted(true)
        setGlobalRatingNumber(globalRatingNumber +1)
        setGlobalRating((globalRating*oldVoters + newRatingMovie)/(oldVoters +1))
      }
      if(globalRatingVoted){
        setGlobalRating((globalRating*globalRatingNumber + 1)/globalRatingNumber)
      }
    }
  }

  const handleLikeStar = (num) =>{
    setMyRatingMovie(num+1)
  } 

  const handleRateStar = (num) => {
    const newRatingMovie = num + 1
    setMyRatingMovie(newRatingMovie)
    let oldVoters = globalRatingNumber
    if(!globalRatingVoted){
      setGlobalRatingVoted(true)
      setGlobalRatingNumber(globalRatingNumber +1 )
      setGlobalRating((globalRating*oldVoters + newRatingMovie)/(oldVoters +1))
    }
    if(globalRatingVoted){
      setGlobalRating((globalRating*globalRatingNumber - myRatingMovie + newRatingMovie)/globalRatingNumber)
    }
  }
  let colorLike = {
    cursor : "pointer"
  }
  let colorWatch = {
    cursor : "pointer"
  }
  if(likeMovie){
    colorLike = {
      cursor : "pointer",
      color : '#e74c3c'
    }
  }
  if(watchMovie){
    colorWatch = {
      cursor : "pointer",
      color : '#e74c3c'
    }
  }
  let tableauMyRating = []
  for(let i = 0; i < 10; i++){
    if (i< myRatingMovie){
      tableauMyRating.push(<FontAwesomeIcon onClick = {() => {handleLikeStar(i); handleRateStar(i)}} style = {{color : '#f1c40f'}} icon={faStar} />)
    } else{
      tableauMyRating.push(<FontAwesomeIcon onClick = {() => {handleLikeStar(i); handleRateStar(i)}} icon={faStar} />)
    }
  }

  let tableauGlobalRating = []
  for(let i = 0; i < Math.round(globalRating); i++){
    tableauGlobalRating.push(<FontAwesomeIcon style = {{color : '#f1c40f'}} icon={faStar} />)
  }
  for (let i = 0; i < 10 - Math.round(globalRating); i++){
    tableauGlobalRating.push(<FontAwesomeIcon icon={faStar} />)
  }

  useEffect(() =>{
    async function heartChargement(){
      const url = '/wishlist-beginning'
      const rawBackendResponse = await fetch(url)
      const backendResponse = await rawBackendResponse.json()
      console.log(backendResponse)
      for (let i =0; i < backendResponse.length; i++){
        if (backendResponse[i].name === props.movieName){
          setLikeMovie(true)
        }
      }
    } heartChargement()
  }, [])
  return (
      <div className = "col-xs-12 col-lg-6 col-xl-4" style = {{marginBottom : "20px"}}>
        <Card>
          <CardImg top width="100%" src={props.movieImg} alt="Card image cap" />
          <CardBody style = {{marginBottom : 30}}>
            <CardText >
              Like <FontAwesomeIcon style = {colorLike} onClick = {() => handleLike()} icon={faHeart}/>
            </CardText>
            <CardText>
              Nombre de vues : <FontAwesomeIcon style = {colorWatch} onClick = {() => handleWatch()} icon={faVideo}/>
              <Badge color="secondary" style = {{marginLeft : 5}}>{countWatchMovie}</Badge>
            </CardText> 
            <CardText>
              Mon avis : 
              {tableauMyRating}
              ({myRatingMovie})
              <ButtonToggle style = {{marginLeft : 5}} onClick ={ () => handleRateDown()} color="secondary">-</ButtonToggle>
              {' '}
              <ButtonToggle onClick ={ () => handleRateUp()} color="secondary">+</ButtonToggle>
              {' '}
            </CardText>
            <CardText>
              Moyenne : 
              {tableauGlobalRating}
              ({globalRatingNumber})
            </CardText> 
            <CardText>{props.movieName}</CardText>
            <CardText>{props.movieDesc.length > 80 ? props.movieDesc.slice(0,80) + "..." : props.movieDesc  }</CardText>
          </CardBody>
        </Card>
      </div>
  )
}

export default Movie