import "./style/style.scss";
//ladda upp sparade tasks från local storage
let tasks = [];
window.onload = loadTasks;
function loadTasks() {//ska bli renderAllTasks
	tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
	console.log(tasks);
	console.log(tasks[0]);

}
//Skapa uppgiftselement
function renderNewTask(task) {
	const list = document.querySelector(".toDoList");
	const listItem = document.createElement("li");
	listItem.setAttribute("id",task.id);
	listItem.innerHTML = `
	<label for="check">	
	<input type="checkbox" id="check${task.id}" class="check" name="check" value="yes">
	<span class="taskText">${task.text} </span><br>
	<span class="taskDeadline"> ${new Date(task.deadline).toDateString()}</span>
		<button class="deleteTask">
	</label>
		<span class="material-symbols-outlined">delete</span>
		</button>
	  `;
	list.prepend(listItem);
}
//onclick="taskComplete(this)" ${task.completed ? "checked" : ""
//spara uppgift när man trycker på lägg till knappen
const addToDoButton = document.querySelector(".addToDoButton");
addToDoButton.addEventListener("click", addTask);
function addTask(event) {
	event.preventDefault();
	const input = document.querySelector("#addToDo");
	const text = input.value;
	const deadlineInput = document.querySelector("#datePicker");
	const deadline = deadlineInput.value ? new Date(deadlineInput.value).getTime() : "";
	const categoryPicker =  document.querySelector("#categoryPicker");
	const category = categoryPicker.value ?? null; 
	const task = {id: Date.now(), text: text, deadline: deadline, category: category, completed:false};
	tasks.unshift(task);
	localStorage.setItem("tasks", JSON.stringify(tasks));
	if (text) {
		input.value = "";
		input.focus();
	}
	else { 
		document.getElementsByName("addToDo")[0].placeholder="Fyll i en uppgift"; 
		//påminnelse att skriva något om man försöker lägga till tom uppgift
	}

	renderNewTask(task);
	const checkBox = document.querySelector(`#check${task.id}`);
	console.log(checkBox);
	//checkBox.addEventListener("change", );
	//TODO: gör så att kategori återställs till tomt värde efter varje submit-klick, samma för datum.
}
function completeTask() {

}
