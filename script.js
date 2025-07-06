let completedTasks = 0;
const plantImage = document.getElementById("plantImage");
const taskList = document.getElementById("taskList");
const newTaskInput = document.getElementById("newTaskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

let tasks = [];

// Add new task
addTaskBtn.addEventListener("click", addTask);
newTaskInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        newTaskInput.value = "";
        renderTasks();
    }
}

// Render task list
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTask(index));
        
        const taskText = document.createElement("span");
        taskText.className = `task-text ${task.completed ? 'completed' : ''}`;
        taskText.textContent = task.text;
        
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerHTML = "&times;";
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteTask(index);
        });
        
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
    });
}

// Toggle task completion
function toggleTask(index) {
    const task = tasks[index];
    task.completed = !task.completed;
    
    completedTasks = tasks.filter(t => t.completed).length;
    updatePlant();
    renderTasks();
}

// Delete task
function deleteTask(index) {
    if (tasks[index].completed) completedTasks--;
    tasks.splice(index, 1);
    updatePlant();
    renderTasks();
}

// Update plant growth stage
function updatePlant() {
    const stages = ["seed", "sprout", "plant", "leafy", "flower"];
    const stageIndex = Math.min(Math.floor(completedTasks / 5), stages.length - 1);
    plantImage.src = `${stages[stageIndex]}.png`;
    
    if (completedTasks >= 5 && completedTasks % 5 === 0) {
        setTimeout(() => alert(`Congratulations! You've completed ${completedTasks} tasks 🌸`), 300);
    }
}

// Initialize
renderTasks();
