// Setting Javascript Strict Mode 
 'use strict';

/*
 * Defining Variables:
 * removeIcon
 * completeIcon
 *
 * Both receive a svg value, which is the respectively icon simbol
 */
const removeIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
const completeIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

/*
 * Defining Variables:
 * todo
 * completed
 *
 * Both receive the value from a ternary operator, which tests if we have a task inside our lists.
 * if its true, we have the array conversion value.
 * if its false, we have an empty array.
 *
 * Both variables are used to access the browser local storage, which permit us to update the page,
 * and still have the values appearing.
 */
const todo = (localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [] );
const completed = (localStorage.getItem('completed') ? JSON.parse(localStorage.getItem('completed')) : []);

/*
 * Load itens function
 */
loadItens();

/*
 * .new-item-button, is our adding button's class, here we are assigning a click event to it, so we can add new tasks
 * itemText, receives the value from the text input
 * if, the text input is not empty, then we add a new task to the to-do list, we also add the task to the browser's
 * local storage.
 * in case it is empty, then we alert the user, and stop running the application
 * after testing, we update the local storage
 */	
document.getElementById('new-item-button').onclick = function ()
{
	const itemText = document.getElementById('new-item-input').value;

	if (itemText)
	{
		addItemToDOM(itemText);
		todo.push(itemText);
		document.getElementById('new-item-input').value = '';
	}
	else
	{
		alert('Insira uma tarefa');
		return false;
	}
	updateStorage();
}

/*
 * We add an event listenet to the text input, wheneve 'enter', is pressed, it triggers the button click
 * permiting us to adding new tasks, whitout the need to click the button
 *
 */
document.getElementById('new-item-input').addEventListener('keypress',function(event)
{
	if(event.keyCode === 13)
	{
		document.getElementById('new-item-button').click();
	}
})

/*
 * loadItens Function, responsible to load the local storage content
 *
 */
function loadItens()
{
	for (let i = 0; i < todo.length; i++) 
	{
		addItemToDOM(todo[i]);
	}
	for (var i = 0; i < completed.length; i++) {
		addItemToDOM(completed[i],true);
	}

}

/*
 * addItemToDOM Function, receives 2 parameters:
 * itemText, which is the value from the text input
 * completed, which is a boolean, to check if the task will be added to the to-do list, or to the completed one
 *
 * Variables:
 * item, creates a new list item, and receives the value from the input text
 * buttons, creates a div, with the class .buttons
 * removeButton and completeButton, both create a button, then they receive a execute the respectively, icon and function
 * The buttons are added to the div, and then the div is added to the list item.
 *
 * listId, tests where the task will be added, after tested, its added to the corresponding list
 */

function addItemToDOM(itemText,completed)
{
	
		const item = document.createElement('li');
		item.innerText = itemText;

		const buttons = document.createElement('div');
		buttons.classList.add('buttons');

		const removeButton = document.createElement('button');
		removeButton.classList.add('remove');
		removeButton.innerHTML = removeIcon;
		removeButton.onclick = removeItem;

		const completeButton = document.createElement('button');
		completeButton.classList.add('complete');
		completeButton.innerHTML = completeIcon;
		completeButton.onclick = completeItem;

		buttons.append(removeButton);
		buttons.append(completeButton);
		item.append(buttons);

		const listId = (completed ? 'completed-list' : 'todo-list');
		
		document.getElementById(listId).prepend(item);
		
	
}

/*
 * removeItem Function
 *	
 * Variables:
 * item, access the task
 * currentListId, receives the task's id, whether it is completed or not
 * text, access only the task's text
 * remove(), is a javascript function, which removes the item
 * splice(), is a javascript function, to separate elements of an array
 * 
 * this function not only removes the item from the screen, but also from the local storage
 */

function removeItem()
{
	const item = this.parentNode.parentNode;
	const currentListId = item.parentNode.id;
	const text = item.innerText;

	item.remove();

	if (currentListId === "todo-list") 
	{
		todo.splice(todo.indexOf(text),1);
	}
	else
	{
		completed.splice(completed.indexOf(text),1);
	}

	localStorage.setItem('todos',JSON.stringify(todo));
	localStorage.setItem('completed',JSON.stringify(completed));
}

/*
 * completeItem Function
 *	
 * Variables:
 * item, access the task
 * currentListId, receives the task's id, whether it is completed or not
 * text, access only the task's text
 * remove(), is a javascript function, which removes the item
 * splice(), is a javascript function, to separate elements of an array
 * 
 * this function adds the task to the completed list, and in case the user unchecks, the task returns to the todo list
 */
function completeItem()
{
	const item = this.parentNode.parentNode;
	const currentList = item.parentNode;
	const currentListId = currentList.id;
	const text = item.innerText;

	item.remove();

	if (currentListId === 'todo-list') 
	{
		todo.splice(todo.indexOf(text),1);
		completed.push(text);
		document.getElementById("completed-list").prepend(item);
	}
	else
	{
		completed.splice(completed.indexOf(text),1);
		todo.push(text);
		document.getElementById("todo-list").prepend(item);
	}
	updateStorage();
}

/*
 *	updateStorage Function
 *  the name explains itself, it updates the local storage content
 */

function updateStorage()
{
	localStorage.setItem('todos',JSON.stringify(todo));
	localStorage.setItem('completed',JSON.stringify(completed));
}