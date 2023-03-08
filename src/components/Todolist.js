import React, { useState, useRef } from 'react';
import TodoTable from './TodoTable'; 
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
export default function Todolist(){
    
    const[todo, setTodo] = React.useState({description: '', date: '', priority: ''});
    const[todos, setTodos] = React.useState([])
    const gridRef = useRef();
    const handleaddTodo = () => {
        setTodos([todo, ...todos]);
        setTodo({description: '', date: '', priority: ''});
     }
     const deleteTodo = () => {
        if(gridRef.current.getSelectedNodes().length > 0){
            setTodos(todos.filter((todo, index)=>
            index !== gridRef.current.getSelectedNodes()[0].childIndex));
        }else{
            alert('select row first');
        };
        

     }
    const columns = [
        {headerName: "description", field: "description", sortable: true, filter: true},
        {headerName: "date", field: "date", sortable: true, filter: true},
        {headerName: "priority", field: "priority", sortable: true, filter: true,
         cellStyle: params => params.value === "Tärkeä" ? {color : 'red'} : {color : 'black'}}
    ];
 

    return(
    <div className='Todolist'>
            <input 
            placeholder='Description'
            value = {todo.description}
            onChange={e => setTodo({...todo,description: e.target.value})} 
            />
            <input
            type = 'date'
            value={todo.date}
            onChange ={e => setTodo({...todo, date: e.target.value})}
            />
            <input placeholder = 'priority'
            value={todo.priority}
            onChange={e => setTodo({...todo, priority: e.target.value})}/>
            
           <button onClick={handleaddTodo}>Add todo</button>
           <button onClick={deleteTodo}>Delete</button>
        
        <div className='ag-theme-material' style={{height: '700px', width: '80%', margin: 'auto' }}>
        <AgGridReact
        ref={gridRef}
        onGridReady={params => gridRef.current = params.api}
        rowSelection='single'
        columnDefs={columns}
        rowData={todos}>
        </AgGridReact>
        </div>
    </div>
    );
}
