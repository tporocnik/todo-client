export default class TaskList extends HTMLElement {
  
  constructor(){
    super();
    this.tasks;
  }

  connectedCallback() {
    this.loadTasks();
    this.addEventListener("taskAdded", e => this.loadTasks);
   
  }

  template(){
    return `
      <h3>Task list</h3>
       ${this.tasks.map(function(element) {
        return `
        <div class="row" >
        <div class="col-1"><input type="checkbox" value="${element.id}"/></div>
        <div class="col-8">${element.description}</div>
        </div>
        `;
      }).join("")} 
      `
  }

  deleteTask(id){
     console.log("Delete task with id " + id);
     const url = 'http://localhost:8088//todo/tasks/'+ id;

    fetch(url, {
         method: "delete"
        }
    ).then( (response) => { 
      console.log("Done...");
      this.loadTasks();
    });
  } 

  async loadTasks(){
    const url = 'http://localhost:8088//todo/tasks';
    const result = await fetch(url);
    this.tasks = await result.json();
    console.log(this.tasks);
    
    this.innerHTML = this.template();
    
    this.querySelectorAll("input[type=checkbox]").forEach(cb => {
      cb.addEventListener("click", e => this.deleteTask(cb.value));;
    })
  }
}

customElements.define("task-list", TaskList);
