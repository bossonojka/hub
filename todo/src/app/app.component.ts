import { Component } from "@angular/core";
import { Model, ToDoItem } from "app/model";

@Component({
  selector: "todo-app",
  templateUrl: "app.component.html"
})

export class AppComponent{
  model = new Model();

  getName(){
    return this.model.name;
  }

  getToDoItems(){
    return this.model.items.filter(item => !item.done);
  }

  addItem(text){
    if(text != ""){
      this.model.items.push(new ToDoItem(text, false));
    }
  }
}
