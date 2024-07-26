import { TodoTemp, ProjectTemp, NoteTemp } from "./classes";
import { saveTodo, saveProject, saveNote, loadTodos, loadProjects, loadNotes, updateTodoCheckStatus, deleteProject, updateProjectName, updateTodo, deleteTodo, updateNote, deleteNote } from "./storagehandler";
import { makeNewTodoBox, makeNewProjectBox, makeNewNoteBox } from "./domrelated";
import { format, addDays } from "date-fns";

function makeChecklist() {
    document.querySelector('.dialog-checklist-add-btn').addEventListener('click', addItem);

    function addItem() {
        const itemText = document.querySelector('.dialog-checklist-input').value;
        if (itemText.trim() !== '') {
            const checklist = document.querySelector('.dialog-checklist-list-field');

            const listItem = createChecklistItem(itemText, false);
            checklist.appendChild(listItem);

            document.querySelector('.dialog-checklist-input').value = '';
        }
    }
}

function createChecklistItem(itemText, isChecked) {
    const listItem = document.createElement('li');
    listItem.className = 'checklist-item';

    const checkbox = document.createElement('input');
    checkbox.className = 'checkbox';
    checkbox.type = 'checkbox';
    checkbox.checked = isChecked;
    listItem.appendChild(checkbox);
    
    const itemSpan = document.createElement('span');
    itemSpan.textContent = itemText;
    itemSpan.classList.toggle('checked', isChecked);
    listItem.appendChild(itemSpan);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-item-btn';
    deleteBtn.addEventListener('click', 
        function () {
            listItem.remove();
        }
    )
    listItem.appendChild(deleteBtn);

    checkbox.addEventListener('change',
        function() {
            itemSpan.classList.toggle('checked', checkbox.checked);
        }
    )

    return listItem;
}


function newTodoDialogBtnHandler() {
    document.querySelector('.dialog-save-btn').addEventListener('click',
        function () {

            const titleText = document.querySelector('#dialog-title-input').value;
            const descriptionText = document.querySelector('#dialog-description-input').value;

            const prioritySelect = document.querySelector('#dialog-priority-select');
            const priorityText = prioritySelect.options[prioritySelect.selectedIndex].text;
            const priorityValue = prioritySelect.options[prioritySelect.selectedIndex].value;
            const priority = {
                text: priorityText,
                value: priorityValue
            };

            const projectSelect = document.querySelector('#dialog-project-select');
            const projectId = projectSelect.options[projectSelect.selectedIndex].getAttribute('data-project-id');

            const submitDate = new Date();
            const formattedSubmitDate = format(submitDate, 'yyyy-MM-dd');
            
            const dueDate = document.querySelector('#todo-dialog-due-date').value;
            let formattedDueDate;
            if (dueDate === '') {
                formattedDueDate = "none";
            } else {
                formattedDueDate = format(dueDate, 'yyyy-MM-dd');
            }
            
            const checklist = document.querySelector('.dialog-checklist-list-field');
            const checklistItems = [];
            checklist.querySelectorAll('.checklist-item').forEach((listItem) => {
                const itemText = listItem.querySelector('span').textContent;
                const isChecked = listItem.querySelector('input[type="checkbox"]').checked;

                checklistItems.push(
                    {
                        text: itemText,
                        checked: isChecked
                    }
                );
            });

            const todo = new TodoTemp([titleText, descriptionText, projectId, priority, formattedDueDate, formattedSubmitDate, checklistItems, false]);

            saveTodo(todo);

            document.getElementById('todo-dialog').close();
            document.getElementById('todo-dialog').remove();
            document.querySelector(`[data-project-id="${todo.projectId}"]`).querySelector('.project-btn').click();
        }
    )

    document.querySelector('.dialog-delete-btn').addEventListener('click',
        () => {
            document.getElementById('todo-dialog').close();
            document.getElementById('todo-dialog').remove();
        }
    )
}

function newProjectDialogBtnHandler() {
    document.getElementById('project-save-btn').addEventListener('click', 
        () => {
            const titleText = document.getElementById('project-title-input').value;

            const project = new ProjectTemp([titleText]);
            const projectId = project.projectId;



            saveProject(project);
            refreshProjects();
            document.getElementById('project-dialog').close();
            document.getElementById('project-dialog').remove();
            document.querySelector(`[data-project-id="${projectId}"]`).querySelector('.project-btn').click();
        }
    )

    document.getElementById('project-delete-btn').addEventListener('click', 
        () => {
            document.getElementById('project-dialog').close();
            document.getElementById('project-dialog').remove();
        }
    )
}

function newNoteDialogBtnHandler() {
    document.getElementById('note-save-btn').addEventListener('click', 
        () => {
            const titleText = document.getElementById('note-title-input').value;
            const descriptionText = document.getElementById('note-description-input').value;
            const submitDate = new Date();
            const formattedSubmitDate = format(submitDate, 'yyyy-MM-dd');

            const note = new NoteTemp([titleText, descriptionText, formattedSubmitDate]);

            saveNote(note);
            document.getElementById('note-dialog').close();
            document.getElementById('note-dialog').remove();

            document.getElementById('note-btn').click();
        }
    )

    document.getElementById('note-delete-btn').addEventListener('click', 
        () => {
            document.getElementById('note-dialog').close();
            document.getElementById('note-dialog').remove();

            document.getElementById('note-btn').click();
        }

        
    )
}

function refreshProjects() {
    const projectBtnContainer = document.getElementById('project-nav-btn-container');
    while(projectBtnContainer.firstChild) {
        projectBtnContainer.removeChild(projectBtnContainer.firstChild);
    }

    let projectList = loadProjects();
    projectList.forEach(
        (project) => {
            const projectBtnContainer = document.createElement('div');
            projectBtnContainer.className = 'project-btn-container';
            projectBtnContainer.setAttribute('data-project-id', project.projectId)

            const projectBtn = document.createElement('button');
            projectBtn.textContent = project.title;
            projectBtn.className = 'project-btn sidebar-btn';
            
            projectBtnContainer.appendChild(projectBtn);
            
            projectBtn.addEventListener('click', 
                (event) => {
                    sidebarBtnClassHandler(event);
                    // sortTodos(project.projectId);
                    projectBtnController(project.projectId, project.title);
                }
            )

            const editBtn = document.createElement('button');
            editBtn.textContent = 'E';
            editBtn.className = 'edit-btn';
            projectBtnContainer.appendChild(editBtn);

            editBtn.addEventListener('click', 
                () => {
                    makeNewProjectBox();
                    document.getElementById('project-dialog').showModal();
                    document.getElementById('project-title-input').value = project.title;
                    editProjectDialogBtnHandler(project.projectId);
                }
            )

            document.getElementById('project-nav-btn-container').appendChild(projectBtnContainer);

        }
    )
}

function createTodoCard(todo) {
    //add todo card
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    cardContainer.setAttribute('data-todo-id', todo.todoId);

    //add priority show section
    const priorityContainer = document.createElement('div');
    priorityContainer.className = `card-priority-container ${todo.priority.value}`;
    cardContainer.appendChild(priorityContainer);

    //add checkbox section
    const checkboxContainer = document.createElement('input');
    checkboxContainer.className = 'checkbox card-checkbox-container';
    checkboxContainer.type = 'checkbox';
    checkboxContainer.checked = todo.checked;
    cardContainer.appendChild(checkboxContainer);
    checkboxContainer.addEventListener('change', 
        (event) => {
            updateTodoCheckStatus(todo.todoId, event.target.checked);

            setTimeout(() => {
                document.querySelector(`.clicked-btn`).click();
            }, 100)
            //document.querySelector(`.clicked-btn`).click();
            // document.querySelector(`[data-todo-id="${todo.todoId}"]`).classList.toggle('todo-checked', event.target.checked);
        }
    )

    //add title section
    const titleContainer = document.createElement('button');
    titleContainer.className = 'card-title-container';
    titleContainer.textContent = todo.title;
    cardContainer.appendChild(titleContainer);
    titleContainer.addEventListener('click',
        () => {
            makeNewTodoBox();
            document.getElementById('todo-dialog').showModal();
            editTodoDialogHandler(todo);
            editTodoDialogBtnHandler(todo.todoId);
        }
    )

    //add due date section
    const dueDateContainer = document.createElement('div');
    dueDateContainer.className = 'card-due-date-container';
    dueDateContainer.textContent = todo.dueDate;
    cardContainer.appendChild(dueDateContainer);

    return cardContainer;
}

function createNoteCard(note) {
    //add note card
    const cardContainer = document.createElement('div');
    cardContainer.className = 'note-container';
    cardContainer.setAttribute('data-todo-id', note.noteId);

    //add note title
    const titleContainer = document.createElement('button');
    titleContainer.className = 'note-title-container';
    titleContainer.textContent = note.title;
    cardContainer.appendChild(titleContainer);
    titleContainer.addEventListener('click',
        () => {
            makeNewNoteBox();
            document.getElementById('note-dialog').showModal();
            document.getElementById('note-title-input').value = note.title;
            document.getElementById('note-description-input').value = note.description;
            
            editNoteDialogBtnHandler(note.noteId);
        }
    )

    //add note description
    const descriptionContainer = document.createElement('div');
    descriptionContainer.className = 'note-description-container';
    descriptionContainer.textContent = truncateText(note.description, 100);
    cardContainer.appendChild(descriptionContainer);

    //add note submit button
    const submitDateContainer = document.createElement('div');
    submitDateContainer.className = 'note-submit-date-container';
    submitDateContainer.textContent = `Submitted on: ${note.submitDate}`;
    cardContainer.appendChild(submitDateContainer);

    return cardContainer;
}



function editProjectDialogBtnHandler(projectId) {
    document.getElementById('project-save-btn').addEventListener('click', 
        () => {
            const titleText = document.getElementById('project-title-input').value;
            updateProjectName(titleText, projectId);
            document.getElementById('project-dialog').close();
            document.getElementById('project-dialog').remove();

            refreshProjects();
            document.querySelector(`[data-project-id="${projectId}"]`).querySelector('.project-btn').click();

        }
    )

    document.getElementById('project-delete-btn').addEventListener('click', 
        () => {
            deleteProject(projectId);
            document.getElementById('project-dialog').close();
            document.getElementById('project-dialog').remove();

            refreshProjects();
            let projectList = loadProjects();
            let defaultProjectId = projectList[0].projectId;
            document.querySelector(`[data-project-id="${defaultProjectId}"]`).querySelector('.project-btn').click();
        }
    )
}

function editTodoDialogBtnHandler(todoId) {
    document.querySelector('.dialog-save-btn').addEventListener('click',
        () => {
            const titleText = document.getElementById('dialog-title-input').value;
            const descriptionText = document.getElementById('dialog-description-input').value;

            const prioritySelect = document.getElementById('dialog-priority-select');
            const priorityText = prioritySelect.options[prioritySelect.selectedIndex].text;
            const priorityValue = prioritySelect.options[prioritySelect.selectedIndex].value;
            const priority = {
                text: priorityText,
                value: priorityValue
            };

            const projectSelect = document.getElementById('dialog-project-select');
            const projectId = projectSelect.options[projectSelect.selectedIndex].getAttribute('data-project-id');

            const dueDate = document.getElementById('todo-dialog-due-date').value;
            let formattedDueDate;
            if (dueDate === '') {
                formattedDueDate = "none";
            } else {
                formattedDueDate = format(dueDate, 'yyyy-MM-dd');
            }

            const checklist = document.querySelector('.dialog-checklist-list-field');
            const checklistItems = [];
            checklist.querySelectorAll('.checklist-item').forEach((listItem) => {
                const itemText = listItem.querySelector('span').textContent;
                const isChecked = listItem.querySelector('input[type="checkbox"]').checked;

                checklistItems.push(
                    {
                        text: itemText,
                        checked: isChecked
                    }
                );
            })

            updateTodo([titleText, descriptionText, priority, checklistItems, formattedDueDate, projectId, todoId]);

            document.getElementById('todo-dialog').close();
            document.getElementById('todo-dialog').remove();

            document.querySelector('.clicked-btn').click();
        }
    )
    document.querySelector('.dialog-delete-btn').addEventListener('click',
        () => {
            deleteTodo(todoId);

            document.getElementById('todo-dialog').close();
            document.getElementById('todo-dialog').remove();

            document.querySelector('.clicked-btn').click();
        }
    )
}

function editNoteDialogBtnHandler(noteId) {
    document.getElementById('note-save-btn').addEventListener('click',
        () => {
            const titleText = document.getElementById('note-title-input').value;
            const descriptionText = document.getElementById('note-description-input').value;

            updateNote([titleText, descriptionText, noteId]);

            document.getElementById('note-dialog').close();
            document.getElementById('note-dialog').remove();

            document.getElementById('note-btn').click();
        }
    )

    document.getElementById('note-delete-btn').addEventListener('click',
        () => {
            deleteNote(noteId);

            document.getElementById('note-dialog').close();
            document.getElementById('note-dialog').remove();

            document.getElementById('note-btn').click();
        }
    )
}

function editTodoDialogHandler(todo) {
    document.getElementById('dialog-title-input').value = todo.title;
    document.getElementById('dialog-description-input').value = todo.description;
    document.querySelector(`option[value="${todo.priority.value}"]`).selected = true;
    todo.checklist.forEach((checklistItem) => {
        const listItem = createChecklistItem(checklistItem.text, checklistItem.checked);
        document.querySelector('.dialog-checklist-list-field').appendChild(listItem);
    });
    if(todo.dueDate !== "none") {
        document.getElementById('todo-dialog-due-date').value = todo.dueDate;
    }
    document.querySelector(`option[data-project-id="${todo.projectId}"]`).selected = true;
}

function projectBtnController(projectId, projectTitle) {
    let todoList = loadTodos();
    let projectTodoList = todoList.filter(todo => todo.projectId === projectId);

    refreshTodos(projectTodoList);

    document.getElementById('nav-text-span').textContent = `/ ${projectTitle}`;
}

function noteBtnController() {
    document.getElementById('note-btn').addEventListener('click', 
        (event) => {
            sidebarBtnClassHandler(event);
            refreshNotes();
        }
    )
}

function todayBtnController() {
    document.getElementById('today-nav-btn').addEventListener('click', 
        (event) => {
            const todayDate = new Date();
            let formattedTodayDate = format(todayDate, 'yyyy-MM-dd');
        
            let todoList = loadTodos();
            todoList = todoList.filter(todo => todo.dueDate === formattedTodayDate);
        
            refreshTodos(todoList);
            document.getElementById('nav-text-span').textContent = '/ Due Today';
            sidebarBtnClassHandler(event);
        }
    )
}

function nextSevenDaysBtnController() {
    document.getElementById('next-seven-days-nav-btn').addEventListener('click', 
        (event) => {
            const nextSevenDays = getNextSevenDays();

            let todoList = loadTodos();
            todoList = todoList.filter(todo => nextSevenDays.includes(todo.dueDate));

            refreshTodos(todoList);
            document.getElementById('nav-text-span').textContent = '/ Due Next 7 Days';
            sidebarBtnClassHandler(event);
        }
    )
}

function allToDosBtnController() {
    document.getElementById('all-todos-nav-btn').addEventListener('click', 
        (event) => {
            let todoList = loadTodos();
            refreshTodos(todoList);
            document.getElementById('nav-text-span').textContent = '/ All Todos';   
            sidebarBtnClassHandler(event);       
        }
    )
}

function refreshTodos(todoList) {
    const mainElement = document.querySelector('main');
    while(mainElement.firstChild) {
        mainElement.removeChild(mainElement.firstChild);
    }

    let sortedTodos = sortTodos(todoList);
    sortedTodos.forEach(
        (todo) => {
            const todoCard = createTodoCard(todo);
            document.querySelector('main').appendChild(todoCard);

            const todoContainer = document.querySelector(`[data-todo-id="${todo.todoId}"]`);
            todoContainer.classList.toggle('todo-checked', todo.checked);
        }
    )
}

function refreshNotes() {
    let noteList = loadNotes();

    const mainElement = document.querySelector('main');
    while(mainElement.firstChild) {
        mainElement.removeChild(mainElement.firstChild);
    }

    noteList.forEach(
        (note) => {
            const noteCard = createNoteCard(note);
            document.querySelector('main').appendChild(noteCard);
        }
    )

    document.getElementById('nav-text-span').textContent = '/ Notes';
}

function sidebarBtnClassHandler(event) {
    document.querySelectorAll('.sidebar-btn').forEach(btn => btn.classList.remove('clicked-btn'));
    event.target.classList.add('clicked-btn');
}

function sortTodos(todoList) {
    todoList.sort((a, b) => {
        if (a.checked === false && b.checked === true) {
            return -1;
        } else if (b.checked === false && a.checked === true) {
            return 1;
        } else {
            return 0;
        }
    });

    return todoList;
}

function truncateText(text, maxLength) {
    if(text.length > maxLength) {
        text = text.substr(0, maxLength) + '...';
    }
    return text;
}

function getNextSevenDays() {
    let today = new Date();
    let nextSevenDays = [];

    for (let i = 0; i < 7; i++) {
        const nextDay = addDays(today, i);
        nextSevenDays.push(format(nextDay, 'yyyy-MM-dd'));
    }

    return nextSevenDays;
}


export {
    makeChecklist,
    newTodoDialogBtnHandler,
    newProjectDialogBtnHandler,
    newNoteDialogBtnHandler,
    refreshProjects,
    noteBtnController,
    todayBtnController,
    nextSevenDaysBtnController,
    allToDosBtnController
}