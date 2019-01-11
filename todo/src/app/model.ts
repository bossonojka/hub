export class Model{
    user;
    items;
    constructor(){
        this.user = "Vladimir",
        this.items = [new TodoItem("Buy Flowers", false),
                    new TodoItem("Get Shoes", false),                      
                    new TodoItem("Collect Tickets", false),                      
                    new TodoItem("Call Joe", false, "+380639440298")];
    }
}

export class TodoItem{
    action;
    additional;
    done;
    constructor(action, done, additional=null){
        this.action = action;
        this.done = done;
        this.additional = additional;
    }
}