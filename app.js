document.addEventListener("DOMContentLoaded", ()=>{
    const storedTask = JSON.parse(localStorage.getItem('task'));

    if(storedTask){
        storedTask.forEach((key)=> task.push(key));
    };

    updateTodoList();
    updateStatus();
});

const task = [];


const saveTodoData = ()=>{
    localStorage.setItem('task', JSON.stringify(task));
};

// function for add todo task
const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();

    if (taskValue) {
        task.push({ text: taskValue, completed: false });
        taskInput.value = "";
        updateTodoList();
        updateStatus();
        saveTodoData();
    }
};


const toggleTaskComplete = (index)=>{
    task[index].completed = !task[index].completed;
    updateTodoList();
    updateStatus();
    saveTodoData();
};

// delete task 
const deleteTask = (index)=>{
    task.splice(index, 1);
    updateTodoList();
    updateStatus();
    saveTodoData();
};

// editing task
const editTask= (index)=>{
    const taskInput = document.getElementById('taskInput');
    taskInput.value = task[index].text

    task.splice(index, 1);
    updateTodoList();
    updateStatus();
    saveTodoData();
}


// update todo list function
const updateTodoList = () => {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";

    task.forEach((taskItem, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${taskItem.completed ? 'completed': ''}">
                    <input type="checkbox" class="checkbox" ${taskItem.completed ? 'checked' : ''} />
                    <p>${taskItem.text}</p>
                </div>
                <div class="icons">
                    <img src="icons/edit-50.png" alt="edit" onClick="editTask(${index})"/>
                    <img src="icons/delete.png" alt="delete" onClick="deleteTask(${index})" />
                </div>
            </div>
        `;
        listItem.addEventListener('change', () => toggleTaskComplete(index));
        taskList.appendChild(listItem);
    });
};

// collect todo input data from input feald..
const newTask = document.getElementById('submitBtn');
newTask.addEventListener('click', (event) => {
    event.preventDefault();
    addTask();
}); 

const updateStatus = ()=>{
    const completeTask = task.filter(task => task.completed).length;
    const totalTask = task.length;
    const progress = (completeTask/totalTask)*100;
    const progressBar = document.getElementById('progress');

    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completeTask} / ${totalTask}`;

};

