import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo-model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[];
  showValidationErrors : boolean;
  constructor(private _dataService : DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.todos = this._dataService.getAllTodos();
  }

  onFormSubmit(form: NgForm){
    if(form.invalid) return this.showValidationErrors = true;
    this._dataService.addTodo(new Todo(form.value.text));
    this.showValidationErrors = false;
    form.reset();
  }

  toggleCompleted(todo: Todo){
    todo.completed = !todo.completed;
  }
  editTodo(todo: Todo){
    const index = this.todos.indexOf(todo);

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo
    });

   dialogRef.afterClosed().subscribe((result) => {
     if(result){
       this._dataService.updateTodo(index, result);
     }
    })
  }

  deleteTodo(todo: Todo){
    const index = this.todos.indexOf(todo);
    this._dataService.deleteTodo(index);

  }

}