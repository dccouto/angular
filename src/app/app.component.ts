import {Component} from '@angular/core';
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
		title: ['', Validators.compose([
			Validators.minLength(3),
			Validators.maxLength(20),
			Validators.required
		])]
		})

		this.load()

  	}

	// reseta o formulário do html
	clear(){
		this.form.reset();
	}

	//Pega o texto do input e adiciona um novo item na lista 
	add(){
		const title = this.form.controls['title'].value;
		const id = this.todos.length + 1;
		this.todos.push(new Todo(id, title, false));
		this.save();
		this.clear();

	}
	// Remove item da lista
	remove(todo: Todo){
		const index = this.todos.indexOf(todo);
		if(index !== -1){
			this.todos.splice(index,1);
			//chama o método que salva no localStorage
			this.save();
		}
		
	}

	marcarComConcluido(todo: Todo){
		todo.status = true;
		this.save()
	}
	
	marcarComoNaoConcluido(todo: Todo){
		const index = this.todos.indexOf(todo);

		this.todos[index].status = false;
		this.save();
	}

	//chama o método que salva no localStorage
	save(){
		const dados = JSON.stringify(this.todos);
		localStorage.setItem('tarefas', dados);
	}
	// Carrega do local Storage para o objeto 'todos'
	load(){
		
		const dados = localStorage.getItem('tarefas');
		this.todos = JSON.parse(dados);
		
	}
	

}



