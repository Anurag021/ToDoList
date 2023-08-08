let tasks=[];
const taskList = document.getElementById("task-list");
const taskDescription = document.getElementById("task-desc");
const taskCount = document.getElementById("task-count");
console.log("Script Page Called");



//Hadling input provided by the user
function inputHandler(e) {
    console.log(`keystrokes are ${e.key}`);
    if (e.key == "Enter") {
        const text = e.target.value;
        console.log(text);
        if(!text){
            showNotification("Task cannot be empty");
            return;
        }
        console.log("else executed");
        const task = {
            title: text,
            id: Date.now(),
            completed: false
        }
        e.target.value ="";
        addTask(task);
    }
}

//Creating ADD TASK functinality
function addTask(task) {
    if(task){
        tasks.push(task);
        renderList(); 
        showNotification("task added  Successfuly");
        return;
    }
    showNotification("task cannot be completed");
    

    // console.log('Add Task Trigerred');
    // const li = document.createElement("li");
    // li.innerHTML=`
    // <li id="task">
    //     <input type="checkbox" id="${task.id}"  ${task.completed ? checked : " "}>
    //     <label for="${task.id}">${task.title}</label>
    //     <buttonm id="deleteTask" class="delete-btn" data-id="${task.id}">DeleteTask</button> 
    // </li>
    // `;
    // //Appending element to task-list ul element
    // taskList.append(li);
}

//Creating DELETE Task functionality
function deleteTask(taskId) {
    const newTask = tasks.filter((task) =>{
       return task.id != taskId;
    });     

    tasks = newTask;
    renderList();
    showNotification('Task Deleted Successfully');
 }

//TOGGLE TASK Functionality
function toggleCheckbox(taskId){
    tasks.forEach(task => {
        if (task.id == taskId) {
            task.completed = !task.completed;
        }
    });
    renderList();
}

//Rendering Data on Browser from JS
function renderList() {
    taskList.innerHTML ="";
    taskCount.innerHTML="";

    for (let i = 0; i< tasks.length; i++) {
      addTaskToDom(tasks[i]);
       
    }
   counttasks();

}
//function to Count and Print tasks Numbers
function counttasks() {
    const totalTasks = tasks.length;
    const newTask = tasks.filter((task)=>{
        return task.completed == true
    })
    const completedTasks = newTask.length;
    const remainingTasks = totalTasks- completedTasks;
    console.log("total ",totalTasks, " completed ", completedTasks,
     "remaining ", remainingTasks);

     const div = document.createElement('div');
     div.innerHTML=`
     <p>Total tasks: ${totalTasks}</p>
     <p>Completed tasks: ${completedTasks} </p>
     <p>Remaining Tasks: ${remainingTasks}</p>
     `
     taskCount.append(div);
}

function addTaskToDom(task){
    const li = document.createElement("li");
    li.innerHTML=`
    <li id="task">
        <input type="checkbox" class="checkbox" id="${task.id}"  ${task.completed ? "checked" : " "}>
        <label for="${task.id}">${task.title}</label>
        <button class="delete-btn" id="${task.id}">Delete</button> 
    </li>
    `;
    //Appending element to task-list ul element
    taskList.append(li);
}
//Functionality Completing All 
function completeAll() {
    tasks.forEach((task) =>{
        task.completed = true;
    })
    renderList();
}
//Functionality Clear Complete
function clearComplete(){
    // tasks.forEach((task)=>{
    //     if (task.completed == true) {
    //         deleteTask(task.id);
    //         console.log(tasks);
    //     }
    // })

    const newTask = tasks.filter((task) =>{
        return task.completed != true;
     });     
     console.log("new task array ",newTask);
     tasks = newTask;
     console.log("tasks are ",tasks);
     renderList();
}

//adding Eventlistner To Document
function handlingEventListner(e) {
    console.log("from Event Listner");
    const target = e.target;
    console.log("printing class name ",target.className);
    if (target.className =="add-task") {
        const task = {
            title: taskDescription.value,
            id: Date.now(),
            completed: false
        }
        addTask(task);
    }

    else if(target.className == "delete-btn"){
        console.log("delete clicked");
        console.log("id is ", target.id);
        deleteTask(target.id)
    }
    else if(target.className == "checkbox"){
        console.log("checkbox clicked");
        toggleCheckbox(target.id)
    }
    else if(target.className =="complete-all"){
        completeAll();
    }
    else if(target.className =="clear-complete"){
        console.log("clear Complete Trigerred");
        clearComplete();
    }
}

function showNotification(noti) {
    alert(noti);
}


taskDescription.addEventListener('keyup', inputHandler);
document.addEventListener('click', handlingEventListner);