import { Todo } from "./todo.class";

export class TodoList {

    constructor() {
        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        // local storage
        this.guardarLocalSotrage();
    }

    eliminarTodo(id) {
        // me devuelve un arreglo con los elementos del array menos con los que tenga el id que le pase por parametro
        this.todos = this.todos.filter(todo => todo.id != id);
        // local storage
        this.guardarLocalSotrage();
    }

    marcarCompletado(id) {
        // recorro el array de todos
        for(const todo of this.todos) {
            if(todo.id == id) {
                // cambio el valor del todo
                todo.completado = !todo.completado;
                // local storage
                this.guardarLocalSotrage();
                break;
            }
        }
    }

    eliminarCompletados() {
        // devuelve un arreglo con todos los elementos que no esten completados
        this.todos = this.todos.filter(todo => !todo.completado);
        // local storage
        this.guardarLocalSotrage();
    }

    guardarLocalSotrage() {
        localStorage.setItem('todo', JSON.stringify( this.todos ));
    }

    cargarLocalStorage() {
        this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];

        this.todos = this.todos.map(obj => Todo.fromJSON(obj));
        // this.todos = this.todos.map(Todo.fromJSON); es lo mismo que la linea de codigo de arriba
    }
}