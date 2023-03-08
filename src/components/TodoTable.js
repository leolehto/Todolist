import React from "react";
export default function TodoTable(props){
    
    return(
        <div>
            <table>
                
               {props.todos.map((item, index) => <tr key = {index}><td>{item.description}
               </td><td>{item.date}</td><td>{item.priority}</td><td><button onClick={() => props.handledeletebutton(index)}>Delete</button></td></tr> )}
               

            </table>
            
        </div>
        
    )
}
