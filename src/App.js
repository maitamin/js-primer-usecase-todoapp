console.log("App.js: loaded");

import { element } from "./view/html-util.js";

export class App {
    constructor() {
        console.log("App initialized");
    }

    mount() {
        const fromElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        
        let todoItemCount = 0;
        fromElement.addEventListener("submit", (event) => {
            // submitイベントの本来の動作を止める
            event.preventDefault();
            const todoItemElement = element`<li>${inputElement.value}</li>`;
            containerElement.appendChild(todoItemElement);
            todoItemCount += 1;
            todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
            inputElement.value = "";
        });
    }
}
