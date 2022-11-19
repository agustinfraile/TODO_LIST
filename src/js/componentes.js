import { todoList } from "..";
import { Todo } from "../classes";

// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro')

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
});

divTodoList.addEventListener('click', (e) => {
    const nombreElemento = e.target.localName;
    const todoElemento = e.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    
    if(nombreElemento.includes('input')) { //ya hizo click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) { //si lo incluye hay que borrar el todo
        // elimino del array de todos
        todoList.eliminarTodo(todoId);
        // elimino el todo a la referencia en html
        divTodoList.removeChild(todoElemento);
    }
});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();
    // necesito borrar los elementos de abajo hacia arriba
    for( let i = divTodoList.children.length - 1; i >= 0; i -- ) {
        const elemento = divTodoList.children[i];
        // si tiene la clase completado lo borro del divTodoList
        if(elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (e) => {
    const filtro = e.target.text;
    if(!filtro) return;

    // borro la clase selected
    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    // agrego la clase al elemento que hago click
    e.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtro) {
            case 'Pendientes':
                if(completado) {
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                if(!completado) {
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
});