import NavBar from '../../components/navBar/navBar';
import MenuList from '../../components/menuList/menuList';
import './home.css'


const Home = () =>{
    return(
        <body>
        
        <div className="home__background">
            <NavBar/>
            <div style={{textAlign:"center"}}>
                <MenuList/>
            </div>
        </div>
        </body>
    );
};

export default Home;