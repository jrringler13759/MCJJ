import React, { useEffect, useState } from "react";
import {withRouter} from "react-router-dom";
//import {Link} from "react-router-dom";  --use LINK if using to call another page
//import SaveLib from "../components/saveLibs";
//import Voice from "../components/voice";
import API from "../utils/API.js";
//import Accents from "../components/getAccents.js";

function Create(props) {
    const [words, setWords] = useState(null)
    const [userValues, setUserValues] = useState({});
    const [story, setStory] = useState({})
    const [userStory, setUserStory] = useState();

    useEffect(() => {        
        // console.log("Category",props.location.state.category)    
        // console.log("Language",props.location.state.language)    

        API.getTemplateById("5f2eb96decadf8418428bd52").then((res) => {
            // console.log(res);
            // console.log(res.data.prompts);
            setStory({ details: res.data.story, title: res.data.story })
            setWords(res.data.prompts)
        });

        // API.getTemplatesByCategoryAndLanguage("funny story","English").then((res) => {
        //     console.log(res.data);
        //     // console.log(res.data.prompts);
        //     // setStory({ details: res.data.story, title: res.data.story })
        //     // setWords(res.data.prompts)
        // });


    }, []);

    const onChange = (e) => {
        const value = e.target.value;
        const index = e.target.dataset.index
        userValues[index] = value
        setUserValues(userValues)
        console.log(userValues)
    }

    const onSubmit = (e) => {
        // make sure user filled all inputs
        // Object.keys(userValues).length === words.length

        let userStory = story.details;

        for (let i = 0; i < words.length; i++) {
            console.log({ userValues })
            userStory = userStory.replace("___", userValues[i] || "___")
        }

        setUserStory(userStory)
    }

    return (
        <div>
            <p>Generated Madlib</p>
            {
                words && (
                    <>
                        {words.map((element, i) => {
                            return <input data-index={i} placeholder={element} onChange={onChange} />
                        })}
                        <button onClick={onSubmit}>Submit</button>
                    </>
                )
            }
            {
                userStory && (
                    <>
                        <p id="returnedStory">
                            {userStory}
                        </p>
                        <button>Save</button>
                        <button>New Template</button>
                        {/* <button onClick={getAccents}>Read</button> */}

                        <label for="rate">Rate</label>
                        <div id="rate-value" className="badge">1</div>
                        <input type="range" id="rate" className="custom=range" min="0.5" max="2" defaultValue="1" step="0.1"></input>

                        <label for="pitch">Pitch</label>
                        <div id="pitch-value" className="badge">1</div>
                        <input type="range" id="pitch" className="custom=range" min="0" max="2" defaultValue="1" step="0.1"></input>


                    </>
                )
            }
            <div className="form-group">
                <select id="voice-select" className="form-control" style={{ width: "500px" }}></select>
            </div>
            <button className="btn"></button>

        </div>

    );
}

export default withRouter(Create);

