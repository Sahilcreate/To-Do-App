

function saveTodo(todo) {
    let todoList = loadTodos();
    todoList.push(todo);
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function saveProject(project) {
    let projectList = loadProjects();
    projectList.push(project);
    localStorage.setItem('projectList', JSON.stringify(projectList));
}

function saveNote(note) {
    let noteList = loadNotes();
    noteList.push(note);
    localStorage.setItem('noteList', JSON.stringify(noteList));
}

function loadTodos() {
    let noteList = JSON.parse(localStorage.getItem('todoList')) || [];
    return noteList;
}

function loadProjects() {
    let projectList = JSON.parse(localStorage.getItem('projectList')) || [];
    return projectList;
}

function loadNotes() {
    let noteList = JSON.parse(localStorage.getItem('noteList')) || [];
    return noteList;
}

function updateProjectName(newTitle, projectId) {
    let projectList = loadProjects();
    projectList = projectList.map((project) => {
        if(project.projectId == projectId) {
            project.title = newTitle;
        }
        return project;
    });
    localStorage.setItem('projectList', JSON.stringify(projectList));    
}

function updateTodo([newTitle, newDescription, newPriority, newChecklist, newDueDate, newProjectId, todoId]) {
    let todoList = loadTodos();
    todoList = todoList.map((todo) => {
        if (todo.todoId === todoId) {
            todo.title = newTitle;
            todo.description = newDescription;
            todo.priority = newPriority;
            todo.checklist = newChecklist;
            todo.dueDate = newDueDate;
            todo.projectId = newProjectId;
        }
        return todo;
    })
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function updateNote([newTitle, newDescription, noteId]) {
    let noteList = loadNotes();
    noteList = noteList.map((note) => {
        if(note.noteId === noteId) {
            note.title = newTitle;
            note.description = newDescription;
        }
        return note;
    })
    localStorage.setItem('noteList', JSON.stringify(noteList));
}

function deleteProject(projectId) {
    let projectList = loadProjects();
    let defaultProjectId = projectList[0].projectId;

    if(projectId === defaultProjectId) {
        alert("Default project cannot be deleted. You can however change it's name.")
    } else {
        projectList = projectList.filter(project => project.projectId !== projectId);
        localStorage.setItem('projectList', JSON.stringify(projectList));
    
        
        let todoList = loadTodos();
        todoList = todoList.map((todo) => {
            if(todo.projectId == projectId) {
                todo.projectId = defaultProjectId;
            }
            return todo;
        });
        localStorage.setItem('todoList', JSON.stringify(todoList));
    } 
}

function deleteTodo(todoId) {
    let todoList = loadTodos();

    todoList = todoList.filter(todo => todo.todoId !== todoId);
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function deleteNote(noteId) {
    let noteList = loadNotes();

    noteList = noteList.filter(note => note.noteId !== noteId);
    localStorage.setItem('noteList', JSON.stringify(noteList));
}

function updateTodoCheckStatus(todoId, checkStatus) {
    let todoList = loadTodos();
    todoList = todoList.map((todo) => {
        if(todo.todoId === todoId) {
            todo.checked = checkStatus;
        }
        return todo;
    })
    localStorage.setItem('todoList', JSON.stringify(todoList));
}



export {
    saveTodo,
    saveProject,
    saveNote,
    loadTodos,
    loadProjects,
    loadNotes,
    updateProjectName,
    deleteProject,
    updateTodoCheckStatus,
    updateTodo,
    deleteTodo,
    updateNote,
    deleteNote
};