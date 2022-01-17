//Accessing task list on local storage
const localStorageArray = JSON.parse(localStorage.getItem('localStorageArray'))
//new task input field
const newTaskInput = document.querySelector('.new-task-input')
//task list ul
const taskList = document.querySelector('.task-list')
//empty array
let arrayItems = []

//default values
if (localStorageArray === null) {
	localStorage.setItem('localStorageArray', JSON.stringify([
		{
			task: 'Complete online JavaScript Course',
			completed: true,
			id: 1
		},
		{
			task: 'Jog around the park 3x',
			completed: false,
			id: 2
		},
		{
			task: '10 minutes meditation',
			completed: false,
			id: 3
		},
		{
			task: 'Read for 1 hour',
			completed: false,
			id: 4
		},
		{
			task: 'Pick up groceries',
			completed: false,
			id: 5
		},
		{
			task: 'Complete Todo App on Frontend Mentor',
			completed: false,
			id: 6
		},
	]));
}

arrayItems = JSON.parse(localStorage.getItem('localStorageArray'))

//updates local storage array
const localStorageArrayUpdate = () => {
	localStorage.setItem('localStorageArray', JSON.stringify(arrayItems))
	tasksLeftUpdate()
}

//updating items left element
const tasksLeftUpdate = () => {
	let tasksLeft = arrayItems.length
	arrayItems.forEach(task => {
		if (task.completed === true) {
			tasksLeft--
		}
		const tasksLeftElement = document.querySelector('.card-container-footer-items-left')
		tasksLeftElement.textContent = `${tasksLeft} items left`
	})
}

//listening for new entries on input field
newTaskInput.addEventListener('keyup', (entry) => {
	if (entry.key === 'Enter' && entry.value !== '') {
		addTask(newTaskInput.value)
		newTaskInput.value = ''
		listTasks(arrayItems)
		tasksLeftUpdate()
	}
})

//task adding function
const addTask = (entry) => {
	const task =
	{
		task: entry,
		completed: false,
		id: Date.now()
	}
	arrayItems.push(task)
	localStorageArrayUpdate()
}
const removeTask = (id) => {
	arrayItems = arrayItems.filter(task => task.id != id);
	localStorageArrayUpdate();
};

//listing/refreshing task list
const listTasks = (tasks) => {
	taskList.innerHTML = ''
	tasks.forEach(task => {
		taskList.innerHTML += `
		<li class="task-list-item">
					<input type="checkbox" aria-label="todo complete" class="task-list-check">
					<p class="task-list-text"></p>
					<button class="task-list-remove" aria-label="remove item"></button>
				</li>	`
		const li = taskList.lastElementChild
		li.setAttribute('data-id', task.id)
		const p = taskList.lastElementChild.querySelector('.task-list-text')
		p.appendChild(document.createTextNode(task.task))
		const checkbox = li.querySelector('.task-list-check');
		if (task.completed === true) {
			checkbox.setAttribute('checked', '');
			checkbox.nextElementSibling.classList.add('new-task-complete');
			checkbox.nextElementSibling.classList.add('completed')
		}
	});
}

listTasks(arrayItems)
tasksLeftUpdate()

//task deleting function
taskList.addEventListener('click', (event) => {
	if (event.target.classList.contains('task-list-remove')) {
		const id = event.target.parentElement.getAttribute('data-id')
		removeTask(id)
		event.target.parentElement.remove()
	}
	tasksLeftUpdate()
})

//marking checkbox completed when clicking on task
taskList.addEventListener('click', (event) => {
	if (event.target.classList.contains('task-list-text')) {
		event.target.parentElement.firstElementChild.click()
	}
})

//when activating checkbox, apply class to blur task
taskList.addEventListener('change', (event) => {
	if (event.target.classList.contains('task-list-check')) {
		const index = arrayItems.findIndex(task => task.id == event.target.parentElement.getAttribute('data-id'))
		if (event.target.checked === true) {
			arrayItems[index].completed = true
			event.target.nextElementSibling.classList.add('completed')
		} else {
			arrayItems[index].completed = false
			event.target.nextElementSibling.classList.remove('completed')
		}
	}
	localStorageArrayUpdate()
	tasksLeftUpdate()
})

//clear completed tasks function
const clearCompletedTasks = () => {
	const checkboxes = document.getElementsByClassName('task-list-check')
	for (let x = 0; x < checkboxes.length; x++) {
		if (checkboxes[x].checked === true) {
			const id = checkboxes[x].parentElement.getAttribute('data-id')
			removeTask(id)
			checkboxes[x].parentElement.remove()
		}
	}
}

//filtering tasks
const filterTasksList = (complete = false) => {
	listTasks(arrayItems)
	const checkboxes = document.getElementsByClassName('task-list-check')
	for (let x = 0; x < checkboxes.length; x++) {
		if (checkboxes[x].checked === complete) {
			checkboxes[x].parentElement.style.display = 'none'
		}
	}
}
//changing active tab color
const activeFilterTab = (tab = 'all') => {
	const tabs = document.querySelector('.card-container-footer-categories').children
	for (let x = 0; x < tabs.length; x++) {
		tabs[x].classList.remove('current-tab')
	}
	document.getElementById(`task-filter-${tab}`).classList.add('current-tab')
}
activeFilterTab()


//DARK/LIGHT MODE TOGGLE

let theme = localStorage.getItem('theme')
const themeToggler = document.querySelector('.theme-toggle')

const toggleLightMode = () => {
	document.body.classList.add('light-mode')
	localStorage.setItem('theme', 'light')
	themeToggler.innerHTML = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>'
}
const toggleDarkMode = () => {
	document.body.classList.remove('light-mode')
	localStorage.setItem('theme', 'dark')
	themeToggler.innerHTML = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>'
}
themeToggler.addEventListener('click', () => {
	theme = localStorage.getItem('theme')
	if (theme === 'dark') {
		toggleLightMode()
	} else {
		toggleDarkMode()
	}
})

//checking for default theme preference, if none, sets light mode
const themePreference = window.matchMedia('(prefers-color-scheme: dark)').media
if (themePreference === 'dark') {
	toggleDarkMode()
} else {
	toggleLightMode()
}