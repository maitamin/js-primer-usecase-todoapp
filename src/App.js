console.log("App.js: loaded");

import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";

export class App {
    constructor({ formElement, formInputElement, todoListContainerElement, todoCountElement }) {
        // console.log("App initialized");
        this.todoListView = new TodoListView();
        this.todoListModel = new TodoListModel();

        this.formElement = formElement;
        this.formInputElement = formInputElement;
        this.todoListContainerElement = todoListContainerElement;
        this.todoCountElement = todoCountElement;
        // ハンドラ呼び出しで、`this`が変わらないように固定する
        // `this`が常に`App`のインスタンスを示すようにする
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Todoを追加するときに呼ばれるリスナー関数
     * @param {string} title
     */
    handleAdd(title) {
        this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
    }

    /**
     * Todoの状態を更新したときに呼ばれるリスナー関数
     * @param {{ id:number, completed: boolean }}
     */
    handleUpdate({ id, completed }) {
        this.todoListModel.updateTodo({ id, completed });
    }

    /**
     * Todoを削除したときに呼ばれるリスナー関数
     * @param {{ id: number }}
     */    
    hnadleDelete({ id }) {
        this.todoListModel.deleteTodo({ id });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.handleAdd(this.formInputElement.value);
        this.formInputElement.value = "";
    }

    handleChange() {
        const todoListElement = this.todoListView.createElement(this.todoListModel.getTotalItems(), {
            onUpdateTodo: ({ id, completed }) => {
                this.handleUpdate({ id, completed });
            },
            onDeleteTodo: ({ id }) => {
                this.hnadleDelete({ id });
            }
        });
        render(todoListElement, this.todoListContainerElement);
        this.todoCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    }

    mount() {
        console.log("mount");
        this.todoListModel.onChange(this.handleChange);
        this.formElement.addEventListener("submit", this.handleSubmit);
    }

    unmount() {
        console.log("unmount");
        this.todoListModel.offChange(this.handleChange);
        this.formElement.removeEventListener("submit", this.handleSubmit);
    }
}
