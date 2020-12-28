import React, { useEffect, useState } from 'react';
import Update from "./Update";

function List(props){

    const [updateMode, setUpdateMode] = useState(false);   
    
    const [filterMode, setFilterMode] = useState(false);

    const [taskToUpdate, setTaskToUpdate] = useState({
        todo_title:"",
        due_date:"",
        todo_tag:"",
    });

    const [listOfTasks, setListOfTasks] = useState([]);

    const [listOfFilteredTasks, setListOfFilteredTasks] = useState([]);

    function reset(){
        setUpdateMode(false);
        setFilterMode(false);
        props.setSearchMode(false);
    }
    

    function filterTasks(event){
        setFilterMode(true);
        if (event.target.value === "") {
            setListOfFilteredTasks(listOfTasks);
        } else {
            const filtered = listOfTasks.filter(item => {
                return item.todo_tag.toUpperCase() === event.target.value.toUpperCase();
            });
            setListOfFilteredTasks(filtered);
        }
    }

    const getTasks = async () => {
        const response = await fetch("http://localhost:3000/todos");
        const data = await response.json();
        setListOfTasks(data);
    }

    function selectUpdate(taskItem) {
        setTaskToUpdate(taskItem);
        setUpdateMode(true);
    }


    function listTask(taskItem){
        const current_date = new Date();
        let late = new Date(taskItem.due_date) < current_date;

        return (
            <div>
                <h3 style={{color: late ? "red" : "black"}}>{taskItem.todo_title}</h3>
                <h5>{taskItem.due_date}</h5>
                <h5>{taskItem.todo_tag}</h5>
                <button onClick={() => deleteTask(taskItem)}>Delete</button>
                <button onClick={() => selectUpdate(taskItem)}>Update</button>
                {props.searchMode ? <button onClick={() => reset() }>Back</button> : null}
            </div>
        )
    }

    function sortDate(listOfTasks){
        listOfTasks.sort((a, b) => {
            if (new Date(a.due_date) < new Date(b.due_date)){
                return -1;
            } else {
                return 1;
            }
        });
        return listOfTasks;
    }

    const deleteTask = async taskItem => {
        
        const response = await fetch("http://localhost:3000/todos/" + taskItem.id, {
            method: "delete",
        })
        reset();
        await getTasks();

    }

   

    useEffect(() => {getTasks()}, []);


    return(
        <div>
            {props.searchMode && props.searchResults.length === 0 ? 
                <div>
                    <h1>No Tasks Found.</h1>
                    <br/>
                    <br/>
                    <button onClick={() => reset() }>Back</button>
                </div> : props.searchMode ? 
                <div>
                    <h1>List of Tasks</h1>
                </div> : 
                <div>
                    <h1>List of Tasks</h1><br/>
                    <h3>Filter By:</h3>
                    <select onChange={filterTasks}>
                        <option value="">All</option>
                        <option value="school">School</option>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="urgent">Urgent</option>
                        <option value="important">Important</option>
                    </select>
                </div> 
            }

            {props.searchMode ? sortDate(props.searchResults).map(listTask) 
                                : filterMode ? sortDate(listOfFilteredTasks).map(listTask) 
                                        : sortDate(listOfTasks).map(listTask)}

            <Update taskItem={taskToUpdate}
                    getTasks={getTasks} 
                    update_mode={updateMode}
                    setUpdateMode={setUpdateMode}
                    setTaskToUpdate={setTaskToUpdate}
                    reset={reset}  />
        </div>
        
    )
}

export default List;