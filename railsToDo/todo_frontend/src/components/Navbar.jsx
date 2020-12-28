import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Add from "./Add";
import List from "./List";

function Navbar(){

    const [searchMode, setSearchMode] = useState(false);

    const [query, setQuery] = useState("");

    const [searchResults, setSearchResults] = useState([]);

    function handleSearchChange(event){
        setQuery(event.target.value);
    }

    const searchTask = async event => {
        event.preventDefault();
        const response = await fetch("http://localhost:3000/todos");
        const data = await response.json();

        setSearchMode(true);
        setQuery("");
        if (query === ""){
            setSearchResults(data);
        } else {
            const filtered = data.filter(item => {
                return item.todo_title.toUpperCase().includes(query.toUpperCase());
            });
            setSearchResults(filtered);
        }
    }

    return (
        <div>
        <nav class="navbar navbar-expand-lg navbar-dark header">
        <div class="container-fluid">
            <a class="navbar-brand">Taskify</a>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <Link to="/" class="nav-link active"><strong>Tasks</strong></Link>
                </li>
                <li class="nav-item">
                    <Link to="/add" class="nav-link active">Add Task</Link>
                </li>
            </ul>
            
            
            </div>
            <form class="d-flex">
                <input onChange={handleSearchChange} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={query} />
                <button onClick={searchTask} class="btn btn-outline-light" >Search</button>
            </form>
            
            
        </div>
        </nav>
        
        <Switch>
            <Route exact path="/" render={()=> <List searchResults={searchResults} 
                                                     searchMode={searchMode} 
                                                     setSearchMode={setSearchMode} /> } />
            <Route component={Add} path="/add" />
        </Switch>
    </div>

    )
}

export default Navbar;