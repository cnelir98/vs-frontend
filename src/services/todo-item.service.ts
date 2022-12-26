import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoItem} from '../models/todoItem';
@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  constructor(private http: HttpClient) { }

  getItemById(id:String):Observable<String>{
    return this.http.get<String>('http://localhost:8080/todos/id/' + id);

  }
  createItemPathVariable(todoItemName: String): Observable<any> {
    return this.http.post<any>('http://localhost:8080/todos/' + todoItemName, null);
  }

  createItemJSON(todoItem: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>('http://localhost:8080/todos/',todoItem);
  }

  getTodoItems(): Observable<TodoItem[]>{
    return this.http.get<TodoItem[]>('http://localhost:8080/todos/');
  }

  //Can not add request body on http.delete ?!
  deleteToDoItem(todoItem: TodoItem):Observable<any> {
    return this.http.request<any>('delete','http://localhost:8080/todos/', {body:todoItem});
  }

  getToDoItemCount():Observable<number>{
    return this.http.get<number>('http://localhost:8080/todos/count');

  }
}
