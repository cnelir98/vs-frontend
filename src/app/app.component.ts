import { Component,OnInit } from '@angular/core';
import {TodoItem} from "../models/todoItem";
import {TodoItemService} from "../services/todo-item.service";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  todoItems!:TodoItem[];
  todoItem!:TodoItem;
  todoCount:number = 0;
  todoForm = new FormControl('', {nonNullable:true});
  prioForm = new FormControl('', {nonNullable:true});

  constructor(private todoItemService: TodoItemService) {}

  ngOnInit(){
    this.getToDoItems();
  }

  getToDoItems(){
    this.todoItemService.getTodoItems().subscribe((result)=>{
      this.todoItems = result;
      this.toDoItemCount();
    });
  }

  toDoItemCount(){
    this.todoItemService.getToDoItemCount().subscribe((result) => {
      this.todoCount = result;
    });
  }

  addItem(){
    this.todoItem = new TodoItem();
    this.todoItem.todo = this.todoForm.value;
    this.todoItem.priority = Number(this.prioForm.value);
    this.todoItemService.createItemJSON(this.todoItem).subscribe((result)=>{
      console.log(result);
      this.prioForm.reset();
      this.todoForm.reset();
      this.getToDoItems();
    });
  }

  deleteToDoItem(todoItem: TodoItem){
    console.log(todoItem);
    this.todoItemService.deleteToDoItem(todoItem).subscribe((result)=>{
      console.log(result);
      this.getToDoItems();
    })
  }

}
