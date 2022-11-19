export class Todo {

    static fromJSON ( { tarea, id, completado, creado } ) {
        const tempTodo = new Todo(tarea);
        // recupero los metodos
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }
    
  
    constructor (tarea) {
        this.tarea = tarea;
        this.id = new Date().getTime(); //representacion del id en funcion del tiempo especifico
        this.completado = false;
        this.creado = new Date();
    }
}
