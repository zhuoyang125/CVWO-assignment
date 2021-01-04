import React from 'react';
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
                    <input class="form-control update-field" onChange={handleChange} type="text" name="todo_title" value={task_item.todo_title}/><br/><br/>
                    <input class="form-control update-field" onChange={handleChange} type="date" name="due_date" value={task_item.due_date} /><br/><br/>
                    <select onChange={handleChange} name="todo_tag" value={task_item.todo_tag}><br/><br/>
                        <option value="" selected disabled hidden>Tags</option>
                        <option value="school">School</option>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="important">Important</option>
                    </select><br/><br/>
                    <button class="btn btn-primary" onClick={createUpdate}><Link style={{color: 'white', textDecoration: 'none'}} to='/'>Update</Link></button>
                </form>
            </div>}
        </div>
        
    )
}

export default Update;