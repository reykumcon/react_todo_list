import React, { useState } from 'react';

const Todo = (props) => {
    const [newTodo, setNewTodo] = useState("");
    const [currentTodos, setCurrentTodos] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (newTodo.length === 0) {
            return;
        }

        const todoObj = {
            name: newTodo,
            isCompleted: false
        }

        setCurrentTodos([...currentTodos, todoObj]);
        setNewTodo("");
    }

    const handleDelete = (index) => {
        const filteredTodos = currentTodos.filter((todo, i) => {
            return i !== index;
        })
        setCurrentTodos(filteredTodos);
    }

    const handleComplete = (index) => {
        const updatedTodos = currentTodos.map((todo, i) => {
            if (index === i) {
                todo.isCompleted = !todo.isCompleted;
            }
            return todo;
        })
        setCurrentTodos(updatedTodos);
    }

    return (
        <div style={{marginTop: "20px"}}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" 
                    onChange={(e) => setNewTodo(e.target.value)}
                    value = {newTodo}    
                />
                <input type="submit" value="Add" />
            </form>
            {
                currentTodos.map((todo, i) => {
                    const todoClasses = ["bold", "italic"];

                    if (todo.isCompleted) {
                        todoClasses.push("line-through");
                    }
                    
                    return (
                        <div key={i} style={{marginTop: "15px"}}>
                            <input onChange={(e) => handleComplete(i)} checked={todo.isCompleted} type="checkbox" />
                            <span className={todoClasses.join(" ")}>{todo.name}</span>
                            <button onClick={(e) => handleDelete(i)} style={{marginLeft: "10px"}}>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Todo;