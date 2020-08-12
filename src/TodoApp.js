import NewTask from "./NewTask.js"
import TaskList from "./TaskList.js"

export class TodoApp extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="container">
      <h1>TODOs</h1>
      <new-task></new-task>
      <task-list></task-list>
    </div>
     `;
  }
}
// assign element to class
customElements.define("todo-app", TodoApp);