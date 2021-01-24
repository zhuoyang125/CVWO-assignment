import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


function Add(props){

    const [newTask, setNewTask] = useState({
        todo_title:"",
        due_date: new Date(),
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

    function handleDateChange(newDate) {
        
        setNewTask(prevValue => {
            return {
                ...prevValue,
                due_date: new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000),

            }
        })
    }


    const addTask = async event => {
        event.preventDefault();

        const response = await fetch("https://todo-rails-backend-api.herokuapp.com/todos", {
            method: "post",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(newTask),
        });

        await props.getTasks();

        setNewTask({
            todo_title:"",
            due_date: new Date(),
            todo_tag:"",
        });
    }



    return (
        <div class="update-field">
            <br/><br/>
            <p class="display-6">Add Task</p>
            <br/><br/>
            <form>
                <TextField id="standard-basic" label="Task Name" onChange={handleChange} name="todo_title" /><br/><br/><br/>
                <DatePicker className="form-control update-field" dateFormat="dd/MM/yyyy" selected={newTask.due_date} utcOffset={0} onChange={handleDateChange} name="due_date" /><br/><br/><br/>
                <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newTask.todo_tag}
                name="todo_tag"
                onChange={handleChange}
                >
                <MenuItem value={"school"}>school</MenuItem>
                <MenuItem value={"work"}>work</MenuItem>
                <MenuItem value={"personal"}>personal</MenuItem>
                <MenuItem value={"important"}>important</MenuItem>
                </Select><br/><br/>
                <button class="btn btn-primary" onClick={addTask}><Link style={{color: 'white', textDecoration: 'none'}} to="/">Submit</Link></button>
            </form>
        </div>
    )
}

export default Add;