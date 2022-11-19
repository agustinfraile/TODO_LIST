import { todoList } from "..";
import { Todo } from "../classes";

// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
        <li class="${ todo.completado ? 'completed' : '' }" data-id=${todo.id}>
            <div class="view">
                <input class="toggle" type="checkbox" ${ todo.completado ? 'checked' : '' }>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
    ` 
 
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild); //el firstElementChild es para que el div contega a todos los li 

    return div;
}

//  Eventos
txtInput.addEventListener('keyup', (e) => {
    //13 es la tecla enter
    if(e.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
})