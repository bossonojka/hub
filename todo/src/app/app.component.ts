import {Model} from "./model";
import {Component} from "@angular/core";

@Component({
  selector: "todo-app",
  templateUrl: "app.component.html"
})

export class AppComponent {
  model = new Model();

  getName(){
    return this.model.user;
  }
}