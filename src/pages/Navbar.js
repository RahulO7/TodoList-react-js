import React, { useState } from 'react'
import styled from 'styled-components'

export default function Navbar() {
    const[hamer,setHamer]=useState(false);
  return (
    <Nav>
        <div className="logo">
            <h3>ToDoList</h3>

        </div>
        <div className={hamer ? "menus menu-mobile" : "menus"}>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/">About</a></li>
                <li><a href="/">Help</a></li>
                <li><a href="/">Contact</a></li>
            </ul>
            <div className="close" onClick={()=>setHamer(false)}>
                <span className='span1'></span>
                <span className='span2'></span>
            </div>
        </div>
        <div className="hamburger" onClick={()=>setHamer(!hamer)} > 
       
           
            <span></span>
            <span></span>
            <span></span>
            
        </div>

    </Nav>
    
    
  )
}

const Nav = styled.div`
width: 100vw;
height: 100px;
background-color: #d2d4d2;
position: sticky;
top: 0;
z-index: 199;

display: flex;
align-items: center;
justify-content: space-around;

.hamburger{
    display: none;
}
.menu-mobile{
    display: none;
}


.menus ul{
    display: flex;
    align-items: center;
    justify-content:center;
}
.menus ul li{
    list-style: none;
    margin: 5px;

}
.menus ul li a{
    text-decoration: none;
color: black;
}


@media (max-width:998px) {
    .menus{
        display: none;
    }
    .menu-mobile{
        display: flex;
    
        align-items: center;
        justify-content: center;
     position: fixed;
    top: 0px;
     width: 100vw;
     height: 100vh;
        background-color: #969e93;
        
        z-index: 999;

        
    }
    .menu-mobile ul{
        flex-direction: column;

        li{
            padding: 10px;
        }
       li a{
        color: black;
        font-size: 25px;


       }
    }

    .close{
    position: absolute;
    top: 40px;
    right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;

}
.close span{
    height: 2px;
    width: 100%;
    background-color: black;
}
.span1{
    transform: rotate(-45deg);
}
.span2{
    transform: rotate(45deg);
}


    .hamburger{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        height: 30px;
        width: 30px;
        position: absolute;
        right: 10px;
        /* background-color: white; */
    }
   
    .hamburger  span{
        height: 2px;
        width: 90%;
        background-color: black;
       /* margin: 5px; */
    }
    
}

`
