import 'bootstrap/dist/css/bootstrap.min.css'
import {
    Navbar,
    NavbarBrand,
    ListGroup, 
    ListGroupItem,
    NavLink,
    Button, UncontrolledPopover, PopoverHeader, PopoverBody
  } from 'reactstrap';
import React from 'react';


function Header(props) {
    // const [isOpen, setIsOpen] = useState(false);
    // const toggle = () => setIsOpen(!isOpen);
    // const wishList = 
    // for (let i = 0; i < props.myWishList.length; i ++){
    //   const curMovie = props.myWishList[i]
    //   wishList.push(
          // <ListGroupItem className="justify-content-between">
          //     <img  class = "img-fluid" style = {{height : "50px"}}src ={curMovie.imgName} />
          //     <br></br>
          //     {curMovie.name}
          // </ListGroupItem>
    //   )
    // }
    return(
        <div>
          <Navbar color="#3d3d3d" light expand="md">
            <NavbarBrand href="/"><img src = "../logo.png" /></NavbarBrand>
            <NavLink href="/" style = {{color : 'white'}}>Latest Releases</NavLink>
            <Button id="UncontrolledPopover" type="button">
             {props.compteurWishlist} Films
            </Button>
            {props.myWishList.length > 0 && <UncontrolledPopover placement="bottom" target="UncontrolledPopover">
              <PopoverHeader>Wishlist</PopoverHeader>
                <PopoverBody>
                  <ListGroup>
                    {props.myWishList.map((movie)=>{
                      return (
                        <ListGroupItem className="justify-content-between">
                          <img className = "img-fluid" style = {{height : "50px"}} src ={movie.img} />
                          <br></br>
                          {movie.name}
                        </ListGroupItem>
                      )
                    })}
                  </ListGroup> 
                </PopoverBody>
            </UncontrolledPopover>}
          </Navbar>
        </div>
    )
}

export default Header