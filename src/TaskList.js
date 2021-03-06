import {html, render} from 'https://unpkg.com/lit-html?module';

export default class TaskList extends HTMLElement {
  
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    this.tasks;
  }

  connectedCallback() {
    this.loadTasks();
    this.addEventListener("taskAdded", e => this.loadTasks);
  }

  template(){
    return html`
      <style> @import "https://cdnjs.cloudflare.com/ajax/libs/wingcss/0.1.8/wing.min.css"; </style>
      <h3>Task list</h3>
      ${this.tasks.map(element => html`
        <div class="row" >
        <div class="col-1"><input type="checkbox" @click=${()=>{this.deleteTask(element.id)}}/></div>
        <div class="col-8">${element.description}</div>
        </div>
      `)}
    `;
  }

  deleteTask(id){
     const url = 'http://localhost:8088//todo/tasks/'+ id;

    fetch(url, {
         method: "delete"
        }
    ).then( (response) => { 
      this.loadTasks();
    });
  } 

  async loadTasks(){
    const url = 'http://localhost:8088//todo/tasks';
    const result = await fetch(url);
    this.tasks = await result.json();
   
    render(this.template(), this.shadowRoot, {eventContext: this});
  }
}

customElements.define("task-list", TaskList);
