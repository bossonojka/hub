import { Component } from '@angular/core';
import { Model } from 'app/model';
import { TodoItem } from 'app/model';

@Component({
  selector: 'todo-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  model = new Model();

  getName(){
    return this.model.user;
  }

  getToDoItems(){
    return this.model.items.filter(x => !x.done);
  }

  addItem(action){
    if (/[^\s]+/.test(action)){
      this.model.items.push(new TodoItem(action, false));
    }
  }
}
