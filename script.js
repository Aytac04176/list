const todoContent = document.querySelector(`.todoContent`);
const todoList = document.querySelector('.todo-list');
const clearButton = document.querySelector('#clear-button');
const inputTodo = document.querySelector(".todo-input");
const addTodo = document.querySelector('.add-todo-btn');
const sort = document.querySelector('#sort');
const addIcon = document.querySelector(".add-icon");
let todos = [];
let  isSortedAscending = true;
if (localStorage.getItem('todos')) {
    todos = JSON.parse(localStorage.getItem('todos'));
    updateTodoList();
}
if (todoList.innerHTML.trim() === ``) {
    todoList.style.display = `none`;
}

function updateTodoList() {
    todoList.innerHTML = '';
    todos.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerText = item;
        todoList.appendChild(li);
        inputTodo.value = ``;
        let buttonDelete = document.createElement("button");
        buttonDelete.classList.add('deleteBtn');
        buttonDelete.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        li.appendChild(buttonDelete);
        todoContent.style.display = `block`;

        buttonDelete.addEventListener("click", function () {
            this.parentElement.remove();
            todos.splice(index, 1);
            saveTodosToLocalStorage();
            if (todos.length === 0) {
                todoContent.style.display = `none`;
            }
        })
    })
}

function addNewTodo() {
    if (inputTodo.value.trim() !== ``) {
        todos.push(inputTodo.value.trim());
        saveTodosToLocalStorage();
        updateTodoList();
    } else {
        alert("Please enter a task!");
        inputTodo.value = ``;
    }
    location.reload()
};

function toggleSortOrder() {
    isSortedAscending = ! isSortedAscending;
    todoList.innerHTML = ``;
    if (isSortedAscending) {
        todos.sort();
        sort.innerHTML = `<i class="fa-solid fa-arrow-down-short-wide"></i>`;
    }
    else {
        todos.sort().reverse();
        sort.innerHTML = `<i class="fa-solid fa-arrow-up-short-wide"></i>`;
    }
    updateTodoList();
}

function saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
function hideInputFields() {
    inputTodo.style.display = `none`;
    clearButton.style.display = `none`
}
addIcon.addEventListener('click', function () {
    inputTodo.style.display = `block`;
    clearButton.style.display = `block`
    inputTodo.focus();
});

clearButton.addEventListener('click', () => {
    inputTodo.value = ``;
});

sort.addEventListener('click',toggleSortOrder);

addTodo.addEventListener("click", () => {
    addNewTodo()
    hideInputFields();
}
);

document.addEventListener('keyup', function (e) {
    if (e.key === `Enter`) {
        addNewTodo();
        hideInputFields();
    }
});