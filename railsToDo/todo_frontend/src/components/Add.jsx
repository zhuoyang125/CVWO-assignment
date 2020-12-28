import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Add(){

    const [newTask, setNewTask] = useState({
        todo_title:"",
        due_date:"",
        todo_tag:""
    });
    const [listOfTasks, setListOfTasks] = useState([]);

    const getTasks = async () => {
        const response = await fetch("http://localhost:3000/todos");
        const data = await response.json();
        setListOfTasks(data);
    }

    function handleChange(event){
        const {name, value} = event.target;

        setNewTask(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    const addTask = async event => {
        event.preventDefault();

        const response = await fetch("http://localhost:3000/todos", {
            method: "post",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(newTask),
        });

        await getTasks();

        setNewTask({
            todo_title:"",
            due_date:"",
            todo_tag:""
        });
    }



    return (
        <div>
            <h1>Add Task</h1>
            <form>
                <input onChange={handleChange} type="text" name="todo_title" placeholder="Task" value={newTask.todo_title}/><br/><br/>
                <input onChange={handleChange} type="date" name="due_date" value={newTask.due_date} /><br/><br/>
                <select onChange={handleChange} name="todo_tag" value={newTask.todo_tag}><br/><br/>
                    <option value="" selected disabled hidden>Add Tag</option>
                    <option value="school">School</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="important">Important</option>
                </select><br/><br/>
                <button onClick={addTask}><Link to="/">Submit</Link></button>
            </form>
        </div>
    )
}

export default Add;