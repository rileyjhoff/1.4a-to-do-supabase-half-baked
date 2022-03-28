import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');
const loadingScreen = document.querySelector('.loading-screen');

todoForm.addEventListener('submit', async (e) => {
    // on submit, create a todo, reset the form, and display the todos
    e.preventDefault();
    const data = new FormData(todoForm);
    await createTodo(data.get('todo'));
    todoForm.reset();
    displayTodos();
});

async function displayTodos() {
    loadingScreen.classList.toggle('hide');
    todosEl.textContent = '';
    // fetch the todos
    const todoList = await getTodos();
    // display the list of todos
    for (let todo of todoList) {
        const todoEl = renderTodo(todo);
        // be sure to give each todo an event listener
        // on click, complete that todo
        todoEl.addEventListener('click', async () => {
            await completeTodo(todo.id);
            console.log(todo);
            displayTodos();
        });
        todosEl.append(todoEl);
    }
    loadingScreen.classList.toggle('hide');
}

// add an on load listener that fetches and displays todos on load
window.addEventListener('load', displayTodos());

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {
    if (confirm('Are your sure you want to delete all todos?')) {
        // delete all todos
        await deleteAllTodos();
        // then refetch and display the updated list of todos
        displayTodos();
    }
});
