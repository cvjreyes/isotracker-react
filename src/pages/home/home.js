import NavBar from '../../components/navBar/navBar';
import MenuList from '../../components/menuList/menuList';
import React, { useState , useEffect} from 'react'
import './home.css'
import LoadingScreen3D from '../../components/loadingScreen3D/loadingScreen3D';

//Página de home con el menú para ir a las aplicaciones de isotracker

const Home = () =>{

    const [content, setContent] = useState();
    const [navBar, setNavBar] = useState(null)

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
        }, 2300);

          
    }, [])

    document.title= process.env.REACT_APP_APP_NAMEPROJ
    document.body.style.zoom = 0.8
    return(
        <body>
            <div>
                {navBar}
                {content}
            </div>
        </body>
    );
};

export default Home;