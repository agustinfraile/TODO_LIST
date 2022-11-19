export class Todo {

    
  
    constructor (tarea) {
        this.tarea = tarea;
        this.id = new Date().getTime(); //representacion del id en funcion del tiempo especifico
        this.completado = false;
        this.creado = new Date();
    }
}
