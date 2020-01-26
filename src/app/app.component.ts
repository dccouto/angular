import {
  Component
} from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public todos: Todo[] = []; 
  public title: String = "Minhas Tarefas";
  public form: FormGroup;
  
  /**
   *No construtor está sendo criado uma instância do formBuider que pertence a classe @angular/forms
   */
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      //Primeiro campo é um placeholder. Caso tenho mais de um validator é necessário colocar o Validator.compose([]), 
      //caso contrario colocar apenas um tipo de validator
      title: ['placeholder', Validators.compose([
        Validators.minLength(11),
        Validators.maxLength(20),
        Validators.required
      ])]
    }),

    this.todos.push(new Todo(1, 'Ir ao curso', true));
    this.todos.push(new Todo(2,'Estudar em casa', true));
    this.todos.push(new Todo(3,'Ir ao mercado', false));

  }

remove(todo: Todo){
    const index = this.todos.indexOf(todo);
    if(index !== -1){
        this.todos.splice(index,1);
    }
}

marcarComConcluido(todo: Todo){
    todo.status = true;
}

marcarComoNaoConcluido(todo: Todo){
    const index = this.todos.indexOf(todo);

    this.todos[index].status = false;
}

}



