import {html, render} from 'https://unpkg.com/lit-html?module';

export default class NewTask extends HTMLElement {
  
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    render(this.template(), this.shadowRoot, {eventContext: this});
  }

  template(){
     return html`
       <style> @import "https://cdnjs.cloudflare.com/ajax/libs/wingcss/0.1.8/wing.min.css"; </style>
       <h3>Add a task</h3>
       <form >
          <div class="row">
          <div class="col-6"><input type="text" id="description" placeholder="Description" size="60"/>
          </div><div><button @click=${() => {this.addTask()}}>Save</button></div>
          </div>
       </form>
     `
  }

  addTask(){
    const url = 'http://localhost:8088//todo/tasks';

    let description = this.shadowRoot.getElementById("description").value;
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
      const taskAddedEvent = new CustomEvent('taskAdded',{detail:{}, bubbles: true});
      window.dispatchEvent(taskAddedEvent);
    });
  }
}
  
customElements.define("new-task", NewTask);
