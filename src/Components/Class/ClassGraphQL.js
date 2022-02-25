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
                    instructor_history{
                        name 
                        ucinetid
                    }
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

        console.log(classInfo)

        let instructor_history = ""

        if (classInfo.instructor_history){
            instructor_history += "Previous instructors: "
            for(let i = 0 ; i < classInfo.instructor_history.length; i++)
            {
                instructor_history += classInfo.instructor_history[i].name + ", "
            }
            instructor_history = instructor_history.substring(0,instructor_history.length-2)    
        }




        info = 
        <div className="information" typeof="JavaScript">
            <p id="title">{classInfo.title}</p>
            <p id="description">{classInfo.description}</p>
            <p id = "instructor_history">{instructor_history}</p>

            

            
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