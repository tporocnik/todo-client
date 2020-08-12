export default class NewTask extends HTMLElement {
  connectedCallback() {
    console.log("Connect");
    this.innerHTML = `
    <h3>Add a task</h3>
    <form id="task-form">
      <div class="row">
        <div class="col-6"><input type="text" id="description" placeholder="Description" size="60"/>
        </div><div><input type="submit" value="Save"/></div>
      </div>
    </form>
    `;
    document.getElementById("task-form").onsubmit=this.addTask;
  }

  handleClick(){
    console.log("Click");
  }

  addTask(){
    console.log("Starting addTask");
    const url = 'http://localhost:8088//todo/tasks';

    let description = document.getElementById("description").value;
    console.log(`Button clicked with ${description}...`);
    console.log(JSON.stringify({
      description
    }));
    fetch(url, {
         method: "post",
         headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },

      body: JSON.stringify({
        description
      })
    }).then( (response) => { 
      console.log("Done...");
      const taskAddedEvent = new CustomEvent('taskAdded',{detail:{}, bubbles: true});
      window.dispatchEvent(taskAddedEvent);
    });
  }
}
  
customElements.define("new-task", NewTask);
