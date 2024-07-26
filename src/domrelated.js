
import { loadProjects } from "./storagehandler";
// import { format } from "date-fns";
// import { todoTemp, projectTemp, noteTemp } from "./classes";
import { makeChecklist, newTodoDialogBtnHandler, newProjectDialogBtnHandler, newNoteDialogBtnHandler } from "./controller";

function makeAddTodoBtn() {
    const addToDoBtn = document.createElement('button');
    addToDoBtn.textContent = "Add ToDo";
    addToDoBtn.id = 'add-to-do-btn';
    addToDoBtn.className = 'add-btn';
    addToDoBtn.addEventListener('click', () => {
        makeNewTodoBox();
        document.getElementById('todo-dialog').showModal();
        newTodoDialogBtnHandler();
    })
    document.querySelector('#header-nav-container').appendChild(addToDoBtn);
}

function makeAddProjectBtn() {
    const addProjectBtn = document.createElement('button');
    addProjectBtn.textContent = 'Add Project';
    addProjectBtn.id = 'add-project-btn';
    addProjectBtn.className = 'add-btn';
    addProjectBtn.addEventListener('click', () => {
        makeNewProjectBox();
        document.getElementById('project-dialog').showModal();
        newProjectDialogBtnHandler();
    })
    document.getElementById('project-add-btn-container').appendChild(addProjectBtn);
}

function makeAddNoteBtn() {
    const addNoteBtn = document.createElement('button');
    addNoteBtn.textContent = "Add Notes";
    addNoteBtn.id = 'add-note-btn';
    addNoteBtn.className = 'add-btn';
    addNoteBtn.addEventListener('click', () => {
        makeNewNoteBox();
        document.getElementById('note-dialog').showModal();
        newNoteDialogBtnHandler();
    })
    document.getElementById('note-nav-container').appendChild(addNoteBtn);
}



function makeNewTodoBox() {
    //create todo dialog box
    const todoDialog = document.createElement('dialog');
    todoDialog.className = 'dialog';
    todoDialog.id = 'todo-dialog';
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    //create title input section
    const titlePara = document.createElement('p');
    titlePara.className = 'dialog-para dialog-title-para';

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title';
    titleLabel.className = 'dialog-label dialog-title-label';
    titleLabel.htmlFor = 'dialog-title-input';

    const titleInputField = document.createElement('input');
    titleInputField.className = 'dialog-input';
    titleInputField.id = 'dialog-title-input';
    titleInputField.type = 'text';
    titleInputField.maxLength = '20';
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    //create description input section
    const descriptionPara = document.createElement('p');
    descriptionPara.className = 'dialog-para dialog-description-para';

    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description';
    descriptionLabel.className = 'dialog-label dialog-description-label';
    descriptionLabel.htmlFor = 'dialog-description-input';

    const descriptionInputField = document.createElement('textarea');
    descriptionInputField.className = 'dialog-input';
    descriptionInputField.id = 'dialog-description-input';
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    //create checklist section
    const checklistPara = document.createElement('p');
    checklistPara.className = 'dialog-para dialog-checklist-para';

    const checklistLabel = document.createElement('label');
    checklistLabel.textContent = 'Checklist';
    checklistLabel.className = 'dialog-label dialog-checklist-label';
    checklistLabel.htmlFor = 'checklist-input'

    const checklistInputSection = document.createElement('div');
    checklistInputSection.className = 'dialog-checklist-input-section';

    const checklistInputField = document.createElement('input');
    checklistInputField.className = 'dialog-input dialog-checklist-input';
    checklistInputField.id = 'checklist-input'
    checklistInputField.type = 'text';
    checklistInputField.maxLength = '60';

    const checklistInputAddBtn = document.createElement('button');
    checklistInputAddBtn.className = 'dialog-checklist-add-btn';
    checklistInputAddBtn.textContent = 'Add Item';

    const checklistListField = document.createElement('ul');
    checklistListField.className = 'dialog-checklist-list-field';
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    
    //create project selection section
    const projectSelectionPara = document.createElement('p');
    projectSelectionPara.className = 'dialog-para dialog-project-para';

    const projectSelectionLabel = document.createElement('label');
    projectSelectionLabel.textContent = 'Select Project';
    projectSelectionLabel.className = 'dialog-label dialog-project-label';
    projectSelectionLabel.htmlFor = 'dialog-project-select';

    const projectSelectionField = document.createElement('select');
    projectSelectionField.className = 'todo-dialog-select select';
    projectSelectionField.id = 'dialog-project-select';

    let projectSelectionOptions = loadProjects();
    projectSelectionOptions.forEach(
        function (project) {
            const optionElement = document.createElement('option');
            optionElement.textContent = project.title;
            optionElement.setAttribute('data-project-id', project.projectId);

            // Append the option element to the select element
            projectSelectionField.appendChild(optionElement);
        }
    );
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    //create priority selection section
    const prioritySelectionPara = document.createElement('p');
    prioritySelectionPara.className = 'dialog-para dialog-priority-para';

    const prioritySelectionLabel = document.createElement('label');
    prioritySelectionLabel.textContent = 'Select Priority';
    prioritySelectionLabel.className = 'dialog-label dialog-priority-label';
    prioritySelectionLabel.htmlFor = 'dialog-priority-select';

    const prioritySelectionField = document.createElement('select');
    prioritySelectionField.className = 'todo-dialog-select select';
    prioritySelectionField.id = 'dialog-priority-select';

    let prioritySelectionOptions = [
        { priorityName: 'Easy', priorityValue: 'easy'},
        { priorityName: 'Medium', priorityValue: 'medium'},
        { priorityName: 'Hard', priorityValue: 'hard'},
        { priorityName: 'Extreme', priorityValue: 'extreme'}
    ];
    prioritySelectionOptions.forEach(
        function(optionData) {
            let option = new Option(optionData.priorityName, optionData.priorityValue);
            prioritySelectionField.add(option);
        }
    );
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    
    //create btn group section
    const btnGroupPara = document.createElement('p');
    btnGroupPara.className = 'dialog-para dialog-btn-group-para';

    const saveTodoBtn = document.createElement('button');
    saveTodoBtn.className = 'dialog-btn btn dialog-save-btn';
    saveTodoBtn.textContent = 'Save';
    
    const deleteTodoBtn = document.createElement('button');
    deleteTodoBtn.className = 'dialog-btn btn dialog-delete-btn';
    deleteTodoBtn.textContent = 'Delete';
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    

    //create due date section
    const dueDatepara = document.createElement('p');
    dueDatepara.className = 'dialog-para dialog-due-date-para';

    const dueDateLabel = document.createElement('label');
    dueDateLabel.textContent = 'Select Due Date';
    dueDateLabel.className = 'dialog-label dialog-due-date-laebl';
    dueDateLabel.htmlFor = 'todo-dialog-due-date';

    const dueDateSelectionField = document.createElement('input');
    dueDateSelectionField.id = 'todo-dialog-due-date';
    dueDateSelectionField.type = 'date';
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    checklistInputSection.appendChild(checklistInputField);
    checklistInputSection.appendChild(checklistInputAddBtn);

    titlePara.appendChild(titleLabel);
    titlePara.appendChild(titleInputField);
    descriptionPara.appendChild(descriptionLabel);
    descriptionPara.appendChild(descriptionInputField);
    projectSelectionPara.appendChild(projectSelectionLabel);
    projectSelectionPara.appendChild(projectSelectionField);
    prioritySelectionPara.appendChild(prioritySelectionLabel);
    prioritySelectionPara.appendChild(prioritySelectionField);
    btnGroupPara.appendChild(saveTodoBtn);
    btnGroupPara.appendChild(deleteTodoBtn);
    checklistPara.appendChild(checklistLabel);
    checklistPara.appendChild(checklistInputSection);
    checklistPara.appendChild(checklistListField);
    dueDatepara.appendChild(dueDateLabel);
    dueDatepara.appendChild(dueDateSelectionField);


    todoDialog.appendChild(titlePara);
    todoDialog.appendChild(descriptionPara);
    todoDialog.appendChild(prioritySelectionPara);
    todoDialog.appendChild(checklistPara);
    todoDialog.appendChild(dueDatepara);
    todoDialog.appendChild(projectSelectionPara);
    todoDialog.appendChild(btnGroupPara);

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    document.querySelector('main').appendChild(todoDialog);
    makeChecklist();
}

function makeNewProjectBox() {
    //make dialog Box
    const projectDialog = document.createElement('dialog');
    projectDialog.className = 'dialog';
    projectDialog.id = 'project-dialog';

    //make title area
    const titlePara = document.createElement('p');
    titlePara.className = 'dialog-para';
    titlePara.id = 'dialog-project-title';

    //make title label
    const titleLabel = document.createElement('label');
    titleLabel.className = 'dialog-label';
    titleLabel.id = 'project-title-label';
    titleLabel.htmlFor = 'project-title-input';
    titleLabel.textContent = 'Project Title'

    //make title input field
    const titleInputField = document.createElement('input');
    titleInputField.type = 'text';
    titleInputField.id = 'project-title-input';
    titleInputField.className = 'dialog-input';
    titleInputField.maxLength = '20';

    //make btn group para
    const btnGroupPara = document.createElement('p');
    btnGroupPara.className = 'dialog-btn-group-para dialog-para';
    btnGroupPara.id = 'project-btn-group';

    //make save btn
    const saveProjectBtn = document.createElement('button');
    saveProjectBtn.className = 'dialog-btn btn';
    saveProjectBtn.id = 'project-save-btn';
    saveProjectBtn.textContent = 'Save'

    //make delete btn
    const deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.className = 'dialog-btn btn';
    deleteProjectBtn.id = 'project-delete-btn';
    deleteProjectBtn.textContent = 'Delete';

    //append to title para
    titlePara.appendChild(titleLabel);
    titlePara.appendChild(titleInputField);

    //append to btn group para
    btnGroupPara.appendChild(saveProjectBtn);
    btnGroupPara.appendChild(deleteProjectBtn);

    //append to dialog
    projectDialog.appendChild(titlePara);
    projectDialog.appendChild(btnGroupPara);

    //append to sidebar or body
    document.querySelector('.sidebar').appendChild(projectDialog)
};

function makeNewNoteBox() {
    //make dialog Box
    const noteDialog = document.createElement('dialog');
    noteDialog.className = 'dialog';
    noteDialog.id = 'note-dialog';

    //make title area
    const titlePara = document.createElement('p');
    titlePara.className = 'dialog-para';
    titlePara.id = 'dialog-note-title-para';

    //make title label
    const titleLabel = document.createElement('label');
    titleLabel.className = 'dialog-label';
    titleLabel.id = 'note-title-label';
    titleLabel.htmlFor = 'note-title-input';
    titleLabel.textContent = 'Title'

    //make title input field
    const titleInputField = document.createElement('input');
    titleInputField.type = 'text';
    titleInputField.id = 'note-title-input';
    titleInputField.className = 'dialog-input';
    titleInputField.maxLength = '20';

    //make description area
    const descriptionPara = document.createElement('p');
    descriptionPara.className = 'dialog-para';
    descriptionPara.id = 'dialog-note-description-para';

    //make description label
    const descriptionLabel = document.createElement('label');
    descriptionLabel.className = 'dialog-label';
    descriptionLabel.id = 'note-description-label';
    descriptionLabel.htmlFor = 'note-description-input';
    descriptionLabel.textContent = 'Description'

    //make description input field
    const descriptionInputField = document.createElement('textarea');
    descriptionInputField.id = 'note-description-input';
    descriptionInputField.className = 'dialog-input';

    //make btn group para
    const btnGroupPara = document.createElement('p');
    btnGroupPara.className = 'dialog-btn-group-para dialog-para';
    btnGroupPara.id = 'note-btn-group';

    //make save btn
    const saveNoteBtn = document.createElement('button');
    saveNoteBtn.className = 'dialog-btn btn';
    saveNoteBtn.id = 'note-save-btn';
    saveNoteBtn.textContent = 'Save'

    //make delete btn
    const deleteNoteBtn = document.createElement('button');
    deleteNoteBtn.className = 'dialog-btn btn';
    deleteNoteBtn.id = 'note-delete-btn';
    deleteNoteBtn.textContent = 'Delete';

    //append to title para
    titlePara.appendChild(titleLabel);
    titlePara.appendChild(titleInputField);

    //append to description para
    descriptionPara.appendChild(descriptionLabel);
    descriptionPara.appendChild(descriptionInputField);

    //append to btn group para
    btnGroupPara.appendChild(saveNoteBtn);
    btnGroupPara.appendChild(deleteNoteBtn);

    //append to dialog
    noteDialog.appendChild(titlePara);
    noteDialog.appendChild(descriptionPara);
    noteDialog.appendChild(btnGroupPara);

    //append to sidebar or body
    document.querySelector('.sidebar').appendChild(noteDialog)
};



// function makeChecklist() {
//     document.querySelector('.dialog-checklist-add-btn').addEventListener('click', addItem);

//     function addItem() {
//         const itemText = document.querySelector('.dialog-checklist-input').value;
//         if (itemText.trim() !== '') {
//             const checklist = document.querySelector('.dialog-checklist-list-field');

//             const listItem = createChecklistItem(itemText, false);
//             checklist.appendChild(listItem);

//             document.querySelector('.dialog-checklist-input').value = '';
//         }
//     }
// }

// function createChecklistItem(itemText, isChecked) {
//     const listItem = document.createElement('li');
//     listItem.className = 'checklist-item';

//     const checkbox = document.createElement('input');
//     checkbox.className = 'checkbox';
//     checkbox.type = 'checkbox';
//     checkbox.checked = isChecked;
//     listItem.appendChild(checkbox);
    
//     const itemSpan = document.createElement('span');
//     itemSpan.textContent = itemText;
//     itemSpan.classList.toggle('checked', isChecked);
//     listItem.appendChild(itemSpan);

//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.className = 'delete-item-button';
//     deleteBtn.addEventListener('click', 
//         function () {
//             listItem.remove();
//         }
//     )
//     listItem.appendChild(deleteBtn);

//     checkbox.addEventListener('change',
//         function() {
//             itemSpan.classList.toggle('checked', checkbox.checked);
//         }
//     )

//     return listItem;
// }



// function newTodoDialogBtnHandler() {
//     document.querySelector('.dialog-save-btn').addEventListener('click',
//         function () {

//             const titleText = document.querySelector('#dialog-title-input').value;
//             const descriptionText = document.querySelector('#dialog-description-input').value;

//             const prioritySelect = document.querySelector('#dialog-priority-select');
//             const priorityText = prioritySelect.options[prioritySelect.selectedIndex].text;
//             const priorityValue = prioritySelect.options[prioritySelect.selectedIndex].value;
//             const priority = {
//                 text: priorityText,
//                 value: priorityValue
//             };

//             const projectSelect = document.querySelector('#dialog-project-select');
//             const projectId = projectSelect.options[projectSelect.selectedIndex].getAttribute('data-project-id');
//             // const projectValue = projectSelect.options[projectSelect.selectedIndex].value;

//             const submitDate = new Date();
//             const formattedSubmitDate = format(submitDate, 'yyyy-MM-dd');
            
//             const dueDate = document.querySelector('#todo-dialog-due-date').value;
//             let formattedDueDate;
//             if (dueDate === '') {
//                 formattedDueDate = "none";
//             } else {
//                 formattedDueDate = format(dueDate, 'yyyy-MM-dd');
//             }
            
//             const checklist = document.querySelector('.dialog-checklist-list-field');
//             const checklistItems = [];
//             checklist.querySelectorAll('.checklist-item').forEach((listItem) => {
//                 const itemText = listItem.querySelector('span').textContent;
//                 const isChecked = listItem.querySelector('input[type="checkbox"]').checked;

//                 checklistItems.push(
//                     {
//                         text: itemText,
//                         checked: isChecked
//                     }
//                 );
//             });

//             const todo = new todoTemp([titleText, descriptionText, projectId, priority, formattedDueDate, formattedSubmitDate, checklistItems, false]);

//             // todo.title = titleText;
//             // todo.description = descriptionText;
            
//             // const projectId = ;
//             // todo.checklist = checklistItems;
//             // todo.submitDate = formattedSubmitDate;
//             // todo.dueDate = formattedDueDate;

//             saveTodo(todo);

//             document.getElementById('todo-dialog').close();
//             document.getElementById('todo-dialog').remove();
//         }
//     )

//     document.querySelector('.dialog-delete-btn').addEventListener('click',
//         () => {
//             document.getElementById('todo-dialog').close();
//             document.getElementById('todo-dialog').remove();
//         }
//     )
// }

// function newProjectDialogBtnHandler() {
//     document.getElementById('project-save-btn').addEventListener('click', 
//         () => {
//             const titleText = document.getElementById('project-title-input').value;

//             const project = new projectTemp([titleText]);
//             const projectId = project.projectId;



//             saveProject(project);
//             refreshProjects();
//             document.getElementById('project-dialog').close();
//             document.getElementById('project-dialog').remove();
//             document.querySelector(`[data-project-id="${projectId}"]`).querySelector('.project-btn').click();
//         }
//     )

//     document.getElementById('project-delete-btn').addEventListener('click', 
//         () => {
//             document.getElementById('project-dialog').close();
//             document.getElementById('project-dialog').remove();
//         }
//     )
// }

// function newNoteDialogBtnHandler() {
//     document.getElementById('note-save-btn').addEventListener('click', 
//         () => {
//             const titleText = document.getElementById('note-title-input').value;
//             const descriptionText = document.getElementById('note-description-input').value;

//             const note = new noteTemp([titleText, descriptionText]);

//             saveNote(note);
//             document.getElementById('note-dialog').close();
//             document.getElementById('note-dialog').remove();
//         }
//     )

//     document.getElementById('note-delete-btn').addEventListener('click', 
//         () => {
//             document.getElementById('note-dialog').close();
//             document.getElementById('note-dialog').remove();
//         }
//     )
// }



// function refreshProjects() {
//     const projectBtnContainer = document.getElementById('project-nav-btn-container');
//     while(projectBtnContainer.firstChild) {
//         projectBtnContainer.removeChild(projectBtnContainer.firstChild);
//     }

//     let projectList = loadProjects();
//     projectList.forEach(
//         (project) => {
//             const projectBtnContainer = document.createElement('div');
//             projectBtnContainer.className = 'project-btn-container';
//             projectBtnContainer.setAttribute('data-project-id', project.projectId)

//             const projectBtn = document.createElement('button');
//             projectBtn.textContent = project.title;
//             projectBtn.className = 'project-btn sidebar-btn';
//             // projectBtn.setAttribute('data-project-id', project.projectId)
//             // projectBtn.id = project.projectId;
//             // document.getElementById('project-nav-btn-container').appendChild(projectBtn);
//             projectBtnContainer.appendChild(projectBtn);
            
//             projectBtn.addEventListener('click', 
//                 () => {
//                     // projectBtnContainer.classList.toggle
//                     sortTodos(project.projectId);
//                 }
//             )

//             const editBtn = document.createElement('button');
//             editBtn.textContent = 'E';
//             editBtn.className = 'edit-btn';
//             projectBtnContainer.appendChild(editBtn);

//             editBtn.addEventListener('click', 
//                 () => {
//                     makeNewProjectBox();
//                     document.getElementById('project-dialog').showModal();
//                     document.getElementById('project-title-input').value = project.title;
//                     editProjectDialogBtnHandler(project.projectId);
//                 }
//             )

//             document.getElementById('project-nav-btn-container').appendChild(projectBtnContainer);

//         }
//     )
// }

// function sortTodos(projectId) {
//     let todoList = loadTodos();

//     // const checkProjectId = (todo) => {
//     //     return todo.projectId === projectId;
//     // }

//     let projectTodoList = todoList.filter(todo => todo.projectId === projectId);

//     const mainElement = document.querySelector('main');
//     while(mainElement.firstChild) {
//         mainElement.removeChild(mainElement.firstChild);
//     }

//     projectTodoList.forEach(
//         (todo) => {
//             createTodoCard(todo);
//         }
//     )
// }



// function createTodoCard(todo) {
//     //add todo card
//     const cardContainer = document.createElement('div');
//     cardContainer.className = 'card-container';
//     cardContainer.setAttribute('data-todo-id', todo.todoId);

//     //add priority show section
//     const priorityContainer = document.createElement('div');
//     priorityContainer.className = `card-priority-container ${todo.priority.value}`;

//     //add checkbox section
//     const checkboxContainer = document.createElement('input');
//     checkboxContainer.className = 'checkbox card-checkbox-container';
//     checkboxContainer.type = 'checkbox';
//     checkboxContainer.checked = todo.checked;
//     checkboxContainer.addEventListener('change', 
//         () => {
//             cardContainer.classList.toggle('todo-checked', checkboxContainer.checked);
//             updateTodoCheckStatus(todo.todoId, checkboxContainer.checked);
//         }
//     )

//     //add title section
//     const titleContainer = document.createElement('button');
//     titleContainer.className = 'card-title-container';
//     titleContainer.textContent = todo.title;

//     //add due date section
//     const dueDateContainer = document.createElement('div');
//     dueDateContainer.className = 'card-due-date-container';
//     dueDateContainer.textContent = todo.dueDate;

//     cardContainer.appendChild(priorityContainer);
//     cardContainer.appendChild(checkboxContainer);
//     cardContainer.appendChild(titleContainer);
//     cardContainer.appendChild(dueDateContainer);

//     document.querySelector('main').appendChild(cardContainer);
// }


// function editProjectDialogBtnHandler(projectId) {
//     document.getElementById('project-save-btn').addEventListener('click', 
//         () => {
//             const titleText = document.getElementById('project-title-input').value;
//             updateProjectName(titleText, projectId);
//             document.getElementById('project-dialog').close();
//             document.getElementById('project-dialog').remove();

//             refreshProjects();
//         }
//     )

//     document.getElementById('project-delete-btn').addEventListener('click', 
//         () => {
//             deleteProject(projectId);
//             document.getElementById('project-dialog').close();
//             document.getElementById('project-dialog').remove();

//             refreshProjects();
//         }
//     )
// }


export { 
    makeAddTodoBtn,
    makeAddProjectBtn,
    makeAddNoteBtn,
    makeNewTodoBox,
    makeNewProjectBox,
    makeNewNoteBox
};