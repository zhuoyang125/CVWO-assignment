import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Update(props){

    const update_mode = props.update_mode;
    const task_item = props.taskItem;
    const setTaskToUpdate = props.setTaskToUpdate;
    const getTasks = props.getTasks;

    function handleChange(event){
        const { name, value } = event.target;
        setTaskToUpdate( prevValue => {
            return {
                ...prevValue,
                [name]: value,
            }
        });
    }

    const createUpdate = async event => {
        event.preventDefault();

        const response = await fetch("http://localhost:3000/todos/" + task_item.id, {
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
    }

    return (
        
        <div>
            {update_mode && 
            <div>
                <h1>Update Task</h1>
                <form>
                    <input onChange={handleChange} type="text" name="todo_title" value={task_item.todo_title}/><br/><br/>
                    <input onChange={handleChange} type="date" name="due_date" value={task_item.due_date} /><br/><br/>
                    <select onChange={handleChange} name="todo_tag" value={task_item.todo_tag}><br/><br/>
                        <option value="" selected disabled hidden>Tags</option>
                        <option value="school">School</option>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="urgent">Urgent</option>
                        <option value="important">Important</option>
                    </select><br/><br/>
                    <button onClick={createUpdate}><Link to='/'>Update</Link></button>
                </form>
            </div>}
        </div>
        
    )
}

export default Update;