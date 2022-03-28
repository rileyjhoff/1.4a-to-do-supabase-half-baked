export function renderTodo(todo) {
    // create a div and a p tag
    const div = document.createElement('div');
    const todoEl = document.createElement('p');
    const removeButton = document.createElement('button');
    // put the todo's text into the p tag
    todoEl.textContent = todo.todo;
    // add the 'todo' css class no matter what
    div.classList.add('todo');
    // append stuff
    div.append(todoEl);
    // return the div
    // depending on whether the todo is complete, give the div the appropriate css class ('complete' or 'incomplete')
    if (todo.complete) {
        div.classList.add('complete');
        removeButton.classList.add('delete-todo');
        removeButton.textContent = 'Delete todo';
        div.append(removeButton);
    } else {
        div.classList.add('incomplete');
    }
    return div;
}