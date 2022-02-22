import "./ClassGaphQL.css";
import React, {useState, useEffect} from "react";


function ClassGraphQL(props){

    const [classInfo, setClassInfo] = useState({});

    const url = "https://api.peterportal.org/graphql"

    useEffect(  () => {
        const fetchData = async () =>{

            const query = `
            query {
                course(id: "${props.name}"){
                    id
                    department
                    title
                    school
                    description
                }
            }`

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({query}),
                headers:{
                    "Content-Type": "application/json"
                }

            });
            const data = await response.json();
            console.log(data);
            setClassInfo(data.data.course);
        }
        fetchData();
    
    }, [props.name]);


    let info;
    if (classInfo){
        info = 
        <div className="information">
            <p id="title">{classInfo.title}</p>
            <p id="description">{classInfo.description}</p>
        </div>
    }else if(classInfo == null){
        info = <p>Class Not Found</p>
    }
    else{
        info = <p>Loading...</p>

    }


    return(
        <div className = "class">
            <p id="input">{props.name}</p>
            <div>
                {info}
            </div>
        </div>

    )

}


export default ClassGraphQL;