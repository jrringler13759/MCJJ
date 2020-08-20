// create a separate page for story selection form (which adds language, or category in future and THEN goes to Create(complete,generate) component)
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import React, { useState } from "react";
import {Link} from "react-router-dom";
// import stories from "../utils/stories.json";


function StorySelection() {
    const [lang, setLang] = useState();
    const [cat, setCat] = useState();
    
    
    function setLanguage(selectedValue) {
        setLang(selectedValue)   
    }

    function setCategory(selectedValue) {
        setCat(selectedValue)
    }

    


    return(
        <div>
            <h3>Select language:</h3>

            <ToggleButtonGroup type="checkbox" name = "language" value = {lang} onChange = {setLanguage}>
                <ToggleButton value={"English"}>English</ToggleButton>
                <ToggleButton value={"Spanish"}>Spanish</ToggleButton>
            </ToggleButtonGroup>
            <br />
            <ToggleButtonGroup type="checkbox" name = "category" value = {cat} onChange = {setCategory} >
                <ToggleButton value={"Funny"}>Funny</ToggleButton>
                <ToggleButton value={"Scary"}>Scary</ToggleButton>
                <ToggleButton value={"Cuentos"}>Cuentos</ToggleButton>
            </ToggleButtonGroup>
           
            <Link 
            to={{
                pathname: '/create',
                state: {lang, cat}
                }}
            >
                Now enter the missing words
            </Link>

           
        </div>
    );
}

export default StorySelection;


