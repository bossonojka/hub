export class Model{
    name;
    items;
    constructor(){
        this.name = "Adam's";
        this.items = [new ToDoItem("Buy Flowers", false), 
                        new ToDoItem("Collect Tickets", false), 
                        new ToDoItem("Call Joe", false)];
    }
}

export class ToDoItem{
    action;
    done;

    constructor(action, done){
        this.action = action;
        this.done = done;
    }
}