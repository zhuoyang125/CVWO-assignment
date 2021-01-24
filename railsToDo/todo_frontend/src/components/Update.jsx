import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function Update(props){

    var update_mode = props.update_mode;
    var task_item = props.taskItem;
    var setTaskToUpdate = props.setTaskToUpdate;
    var getTasks = props.getTasks;

    const [dueDate, setDueDate] = useState(new Date());

    useEffect(() => {
            if (props.update_mode) {
                console.log(task_item.due_date);
                setDueDate(new Date(task_item.due_date));
            } else {}
        }, [props.update_mode]);

    function handleChange(event){
        const { name, value } = event.target;
        setTaskToUpdate( prevValue => {
            return {
                ...prevValue,
                [name]: value,
            }
        });
    }

    function handleDateChange(newDate) {

        setTaskToUpdate(prevValue => {
            return {
               ...prevValue,
               due_date: new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000),
            }
        });
        setDueDate(new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000));
    }

    const createUpdate = async event => {
        event.preventDefault();

        const response = await fetch("https://todo-rails-backend-api.herokuapp.com/todos/" + task_item.id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task_item),
        });

        await getTasks();

        setTaskToUpdate({
            todo_title:"",
            due_date:"",
            todo_tag:"",
        });

        props.reset();
        setDueDate("");
    }

    return (
        
        <div>
            {update_mode && 
            <div class="update-field">
                <hr></hr>
                <br/>
                <p class="display-6">Update Task</p>
                <br/>
                <form>
                <TextField id="standard-basic" label="Task Name" value={task_item.todo_title} onChange={handleChange} name="todo_title" /><br/><br/><br/>
                <DatePicker className="form-control update-field" utcOffset={0} dateFormat="dd/MM/yyyy" onChange={handleDateChange} selected={dueDate} name="due_date" /><br/><br/><br/>
                <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={task_item.todo_tag}
                name="todo_tag"
                onChange={handleChange}
                >
                <MenuItem value={"school"}>school</MenuItem>
                <MenuItem value={"work"}>work</MenuItem>
                <MenuItem value={"personal"}>personal</MenuItem>
                <MenuItem value={"important"}>important</MenuItem>
                </Select><br/><br/>
                    <button class="btn btn-primary" onClick={createUpdate}><Link style={{color: 'white', textDecoration: 'none'}} to='/'>Update</Link></button>
                </form>
            </div>}
        </div>
        
    )
}

export default Update;
