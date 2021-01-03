import React, { useEffect, useState } from 'react';
import Update from "./Update";
import Alert from "./Alert";
import { animateScroll as scroll } from "react-scroll";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

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

    const [deletedTask, setDeletedTask] = useState("");

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
        scroll.scrollToBottom({duration: 300, smooth: true});
        setTaskToUpdate(taskItem);
        setUpdateMode(true);
    }


    function listTask(taskItem){
        const current_date = new Date();
        let late = new Date(taskItem.due_date) < current_date;

        return (
            <div class="item">
                <h5 style={{color: late ? "red" : "black"}}>{taskItem.todo_title} &nbsp;<span class="badge rounded-pill">{taskItem.todo_tag}</span></h5>
                <br/>
                <div class="date">
                    
                    <p style={{color: late ? "red" : "black"}}><CalendarTodayIcon fontSize="small" /> &nbsp;{taskItem.due_date}</p>
                </div>                
                <br/>
                <button class="btn btn-outline-danger" onClick={() => deleteTask(taskItem)}>Delete</button>
                <button class="btn btn-outline-dark" onClick={() => selectUpdate(taskItem)}>Update</button>
                {props.searchMode ? <button class="btn btn-outline-dark" onClick={() => reset() }>Back</button> : null}
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
        setDeletedTask(taskItem.todo_title);
        const response = await fetch("http://localhost:3000/todos/" + taskItem.id, {
            method: "delete",
        })
        reset();
        await getTasks();

    }

   

    useEffect(() => {getTasks()}, []);


    return(
        <div>
            { deletedTask !== "" ? <Alert todo_title={deletedTask} /> : null }
            { (props.searchMode && props.searchResults.length === 0) || (filterMode && listOfFilteredTasks.length === 0) ? 
                <div class="no-tasks">
                    <p class="fs-4">No Tasks Found.</p>
                    <br/>
                    <br/>
                    <button class="btn btn-outline-dark" onClick={() => reset() }>Back</button>
                </div> : props.searchMode ? 
                <div>
                    <br/>
                </div> : 
                <div class="filter">
                    <select onChange={filterTasks}>
                        <option value="">All</option>
                        <option value="school">School</option>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="important">Important</option>
                    </select>
                </div> 
            }
            <div class="list-tasks">
                {props.searchMode ? sortDate(props.searchResults).map(listTask) 
                                    : filterMode ? sortDate(listOfFilteredTasks).map(listTask) 
                                            : sortDate(listOfTasks).map(listTask)}
            </div>

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