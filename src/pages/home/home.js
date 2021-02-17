import NavBar from '../../components/navBar/navBar';
import MenuList from '../../components/menuList/menuList';
import './home.css'


const Home = () =>{
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