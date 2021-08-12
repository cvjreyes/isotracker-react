import NavBar from '../../components/navBar/navBar';
import MenuList from '../../components/menuList/menuList';
import React, { useState , useEffect} from 'react'
import './home.css'
import LoadingScreen3D from '../../components/loadingScreen3D/loadingScreen3D';
import GreenCircle from "../../assets/images/green_circle.png"
import BlueCircle from "../../assets/images/blue_circle.png"
import FullTrackerLogo from "../../assets/images/3dtracker.png"

//Página de home con el menú para ir a las aplicaciones de isotracker

const Home = () =>{

    const [content, setContent] = useState();
    const [navBar, setNavBar] = useState(null);
    const [circles, setCircles] = useState(null);

    useEffect(() =>{

        setContent(<LoadingScreen3D progress={"25"}/>)
        setTimeout(() => {
            setContent(<LoadingScreen3D progress={"75"}/>)
        }, 1000)
        setTimeout(() => {
            setContent(<LoadingScreen3D progress={"100"}/>)
        }, 2000)
        setTimeout(() => {
            setNavBar(<NavBar/>)
            setContent(<MenuList/>)    
            setCircles(<div><img src={GreenCircle} alt="greenCircle" className="greenCircle__image"/>
            <img src={BlueCircle} alt="blueCircle" className="blueCircle__image"/></div>)        
        }, 2300);

          
    }, [])

    document.title= process.env.REACT_APP_APP_NAMEPROJ
    document.body.style.zoom = 0.73
    return(
        <body>
            {circles}
            <div>
                {navBar}
                {content}
            </div>
        </body>
    );
};

export default Home;