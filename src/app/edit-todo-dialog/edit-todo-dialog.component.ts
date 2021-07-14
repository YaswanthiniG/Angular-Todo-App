import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../shared/todo-model';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.css']
})
export class EditTodoDialogComponent implements OnInit {


  private _dataService: any;

  constructor(
    public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo) { }

 close(){
   this.dialogRef.close();
 }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm){
    if(form.invalid) return;
    
    const updatedTodo = {
      ...this.todo,
      ...form.value
    }
    this.dialogRef.close(updatedTodo);
  }

}
