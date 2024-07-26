

class TodoTemp {
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

class ProjectTemp {
    constructor([title]) {
        this.title = title;
        this.projectId = `${Math.random().toString(36).substring(2) + Date.now().toString(36)}`;
    }
}

class NoteTemp {
    constructor([title, description, submitDate]) {
        this.title = title;
        this.description = description;
        this.submitDate = submitDate;
        this.noteId = `${Math.random().toString(36).substring(2) + Date.now().toString(36)}`;
    }
}

export {
    TodoTemp,
    ProjectTemp,
    NoteTemp
}