import IsoTrackerLogo from "../../assets/images/isotracker.png"
import "./loadingScreen.css"

const LoadingScreen = props =>{

    return( 
        <div className="loading__screen">
            <div className="logo__container">
                <img src={IsoTrackerLogo} alt="isotrackerLogo" className="logo"/>
                
            </div>
            <div className="progress__bar">
                <progress value={props.progress} max="100"/>
            </div>
            
        </div>
    );
};

export default LoadingScreen;