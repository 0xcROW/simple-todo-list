const form = document.querySelector('#todo-form');
const taskTitleInput = document.querySelector('#task-title-input');
const todoListUl = document.querySelector('#todo-list');

let tasks = [];

function renderTaskOnHTML(taskTitle, isDone = false) {
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.addEventListener('change', function (event) {
        const liToTogle = event.target.parentElement
        const spanToTogle = liToTogle.querySelector('span');
        const isChecked = event.target.checked;
        if (isChecked) {
            spanToTogle.style.textDecoration = 'line-through';
        } else {
            spanToTogle.style.textDecoration = 'none';
        }
                    
            tasks = tasks.map(function (task) {
                if (task.title === spanToTogle.textContent) {
                    return {
                        title: task.title,
                        isDone: task.isDone ? false : true
                    };
                }
                return task;
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
    input.checked = isDone;
        
    const span = document.createElement('span');
    span.textContent = taskTitle;
    if (isDone) {
        span.style.textDecoration = 'line-through';
    }
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.addEventListener('click', function () {
        const index = tasks.findIndex(function (task) {
            return task.title === taskTitle;
        });
        tasks.splice(index, 1);
        li.remove();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    
    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);
    todoListUl.appendChild(li);
}

window.onload = function () {
    const tasksFromLocalStorage = localStorage.getItem('tasks');
    
    if (!tasksFromLocalStorage) return;
       
    tasks = JSON.parse(tasksFromLocalStorage);
    tasks.forEach(function (task) {
        renderTaskOnHTML(task.title, task.isDone);
    });
};

form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const taskTitle = taskTitleInput.value;
    
    if (taskTitle.length < 3) {
        alert('Task title should be at least 3 characters long.');
        return;
    }
    
    tasks.push({
        title: taskTitle,
        isDone: false
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    renderTaskOnHTML(taskTitle);    
    
    taskTitleInput.value = '';
});