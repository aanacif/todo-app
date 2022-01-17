"use strict";var localStorageArray=JSON.parse(localStorage.getItem("localStorageArray")),newTaskInput=document.querySelector(".new-task-input"),taskList=document.querySelector(".task-list"),arrayItems=[];null===localStorageArray&&localStorage.setItem("localStorageArray",JSON.stringify([{task:"Complete online JavaScript Course",completed:!0,id:1},{task:"Jog around the park 3x",completed:!1,id:2},{task:"10 minutes meditation",completed:!1,id:3},{task:"Read for 1 hour",completed:!1,id:4},{task:"Pick up groceries",completed:!1,id:5},{task:"Complete Todo App on Frontend Mentor",completed:!1,id:6}])),arrayItems=JSON.parse(localStorage.getItem("localStorageArray"));var localStorageArrayUpdate=function(){localStorage.setItem("localStorageArray",JSON.stringify(arrayItems)),tasksLeftUpdate()},tasksLeftUpdate=function(){var t=arrayItems.length;arrayItems.forEach((function(e){!0===e.completed&&t--,document.querySelector(".card-container-footer-items-left").textContent="".concat(t," items left")}))};newTaskInput.addEventListener("keyup",(function(t){"Enter"===t.key&&""!==t.value&&(addTask(newTaskInput.value),newTaskInput.value="",listTasks(arrayItems),tasksLeftUpdate())}));var addTask=function(t){var e={task:t,completed:!1,id:Date.now()};arrayItems.push(e),localStorageArrayUpdate()},removeTask=function(t){arrayItems=arrayItems.filter((function(e){return e.id!=t})),localStorageArrayUpdate()},listTasks=function(t){taskList.innerHTML="",t.forEach((function(t){taskList.innerHTML+='\n\t\t<li class="task-list-item">\n\t\t\t\t\t<input type="checkbox" aria-label="todo complete" class="task-list-check">\n\t\t\t\t\t<p class="task-list-text"></p>\n\t\t\t\t\t<button class="task-list-remove" aria-label="remove item"></button>\n\t\t\t\t</li>\t';var e=taskList.lastElementChild;e.setAttribute("data-id",t.id),taskList.lastElementChild.querySelector(".task-list-text").appendChild(document.createTextNode(t.task));var a=e.querySelector(".task-list-check");!0===t.completed&&(a.setAttribute("checked",""),a.nextElementSibling.classList.add("new-task-complete"),a.nextElementSibling.classList.add("completed"))}))};listTasks(arrayItems),tasksLeftUpdate(),taskList.addEventListener("click",(function(t){if(t.target.classList.contains("task-list-remove")){var e=t.target.parentElement.getAttribute("data-id");removeTask(e),t.target.parentElement.remove()}tasksLeftUpdate()})),taskList.addEventListener("click",(function(t){t.target.classList.contains("task-list-text")&&t.target.parentElement.firstElementChild.click()})),taskList.addEventListener("change",(function(t){if(t.target.classList.contains("task-list-check")){var e=arrayItems.findIndex((function(e){return e.id==t.target.parentElement.getAttribute("data-id")}));!0===t.target.checked?(arrayItems[e].completed=!0,t.target.nextElementSibling.classList.add("completed")):(arrayItems[e].completed=!1,t.target.nextElementSibling.classList.remove("completed"))}localStorageArrayUpdate(),tasksLeftUpdate()}));var clearCompletedTasks=function(){for(var t=document.getElementsByClassName("task-list-check"),e=0;e<t.length;e++)if(!0===t[e].checked){var a=t[e].parentElement.getAttribute("data-id");removeTask(a),t[e].parentElement.remove()}},filterTasksList=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];listTasks(arrayItems);for(var e=document.getElementsByClassName("task-list-check"),a=0;a<e.length;a++)e[a].checked===t&&(e[a].parentElement.style.display="none")},activeFilterTab=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"all",e=document.querySelector(".card-container-footer-categories").children,a=0;a<e.length;a++)e[a].classList.remove("current-tab");document.getElementById("task-filter-".concat(t)).classList.add("current-tab")};activeFilterTab();var theme=localStorage.getItem("theme"),themeToggler=document.querySelector(".theme-toggle"),toggleLightMode=function(){document.body.classList.add("light-mode"),localStorage.setItem("theme","light"),themeToggler.innerHTML='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>'},toggleDarkMode=function(){document.body.classList.remove("light-mode"),localStorage.setItem("theme","dark"),themeToggler.innerHTML='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>'};themeToggler.addEventListener("click",(function(){"dark"===(theme=localStorage.getItem("theme"))?toggleLightMode():toggleDarkMode()}));var themePreference=window.matchMedia("(prefers-color-scheme: dark)").media;"dark"===themePreference?toggleDarkMode():toggleLightMode();
//# sourceMappingURL=script.js.map