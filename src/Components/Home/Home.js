import React, {useState} from "react";
import Class from "../Class/Class";
import "./Home.css"

function Home(praps){

    const [value, setValue] = useState('');
    const [favoriteClasses, setClasses] = useState([]);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        if(!favoriteClasses.includes(value)){
            setClasses(favoriteClasses.concat(value));
            setValue("");
        }
        console.log(favoriteClasses);
    }


    return(
        <div className="the-whole-page">
            <h1>Hello! Welcome to this website</h1>
                <form onSubmit={handleSubmit}>
                    <label>Add favorite class </label>
                    <input type = "text" value = {value} onChange = {handleChange}></input>
                    <button type = "submit">Add Class</button>
                </form>
                <div className="my-classes">
                    {favoriteClasses.map((favClass) => 
                        <Class name = {favClass} key = {favClass}></Class>
                    )}

                </div>


        </div>

    )

}

export default Home