

class todoTemp {
    constructor([title, description, projectId, priority, dueDate, submitDate, checklist, checked]) {
        this.title = title;
        this.description = description;
        this.projectId = projectId;
        this.priority = priority;
        this.dueDate = dueDate;
        this.submitDate = submitDate;
        this.checklist = checklist;
        this.checked = checked;
        this.todoId = `${Math.random().toString(36).substring(2) + Date.now().toString(36)}`;
    }
}

class projectTemp {
    constructor([title]) {
        this.title = title;
        this.projectId = `${Math.random().toString(36).substring(2) + Date.now().toString(36)}`;
    }
}

class noteTemp {
    constructor([title, description]) {
        this.title = title;
        this.description = description;
        this.noteId = `${Math.random().toString(36).substring(2) + Date.now().toString(36)}`;
    }
}

export {
    todoTemp,
    projectTemp,
    noteTemp
}