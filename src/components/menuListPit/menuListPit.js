import React from 'react';
import MenuListPITList from "../menuListPitList/menuListPitList"




const MenuListPIT = () =>{

    return(
        <div class="panel__container">
            <div className="panel__heading__container">
                <h4>
                    <text className="panel__heading__text">PITRequests</text>
                </h4>
            </div>

            <div className="elements__container">
                <div className="menu" style={{paddingTop:"10px"}}>
                    <MenuListPITList/>
                </div>
                
            </div>
            
            
        </div>
    );
};

export default MenuListPIT;