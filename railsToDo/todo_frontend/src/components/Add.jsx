import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Add(props){

    const [newTask, setNewTask] = useState({
        todo_title:"",
        due_date:"",
        todo_tag:""
    });

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

        await props.getTasks();

        setNewTask({
            todo_title:"",
            due_date:"",
            todo_tag:"",
        });
    }



    return (
        <div class="update-field">
            <br/><br/>
            <p class="display-6">Add Task</p>
            <br/><br/>
            <form>
                <input class="form-control update-field" onChange={handleChange} type="text" name="todo_title" placeholder="Task" value={newTask.todo_title}/><br/><br/>
                <input class="form-control update-field" onChange={handleChange} type="date" name="due_date" value={newTask.due_date} /><br/><br/>
                <select onChange={handleChange} name="todo_tag" value={newTask.todo_tag}><br/><br/>
                    <option value="" selected disabled hidden>Add Tag</option>
                    <option value="school">School</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="important">Important</option>
                </select><br/><br/><br/><br/>
                <button class="btn btn-primary" onClick={addTask}><Link style={{color: 'white', textDecoration: 'none'}} to="/">Submit</Link></button>
            </form>
        </div>
    )
}

export default Add;