import NavBar from '../../components/navBar/navBar';
import MenuList from '../../components/menuList/menuList';
import './home.css'

//Página de home con el menú para ir a las aplicaciones de isotracker

const Home = () =>{
    document.title= process.env.REACT_APP_APP_NAMEPROJ
    return(
        <body>
            <div className="home__background">
                <NavBar/>
                <MenuList/>
            </div>
        </body>
    );
};

export default Home;