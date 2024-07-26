import { makeAddTodoBtn, makeAddProjectBtn, makeAddNoteBtn } from "./domrelated";
import { refreshProjects, noteBtnController, todayBtnController, nextSevenDaysBtnController, allToDosBtnController } from "./controller";
import { saveProject, loadProjects } from "./storagehandler";
import { ProjectTemp } from "./classes";

function renderAll() {
    // makeAddTodoBtn();
    // makeAddProjectBtn();
    // makeAddNoteBtn();
    const projectList = loadProjects();
    if(projectList.length === 0) {
        saveProject(new ProjectTemp(['Default']));
    }
    

    document.addEventListener('DOMContentLoaded', () => {

        const header = document.querySelector('header');
        while(header.firstChild) {
            header.removeChild(header.firstChild);
        }

        const sidebar = document.querySelector('.sidebar');
        while(sidebar.firstchild) {
            sidebar.removeChild(sidebar.firstChild);
        }

        const main = document.querySelector('main');
        while(main.firstChild) {
            main.removeChild(main.firstChild);
        }

        //add logo container with logo span in header
        const logoContainer = document.createElement('div');
        logoContainer.id = 'logo-container';
        const logoSpan = document.createElement('span');
        logoSpan.id = 'logo-span';
        logoSpan.textContent = 'Remindmy';
        logoContainer.appendChild(logoSpan);
        document.querySelector('header').appendChild(logoContainer);
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


        //header container other than logo
        const headerNavContainer = document.createElement('div');
        headerNavContainer.id = 'header-nav-container';
        document.querySelector('header').appendChild(headerNavContainer);

        //navigation text in header
        const navTextContainer = document.createElement('div');
        navTextContainer.id = 'nav-text-container';
        const navTextSpan = document.createElement('span');
        navTextSpan.id = 'nav-text-span';
        navTextContainer.appendChild(navTextSpan);
        headerNavContainer.appendChild(navTextContainer)
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //Add-ToDo Button
        makeAddTodoBtn();
        //~~~~~~~~~~~~~~~

        //todo nav section
        const todoNavContainer = document.createElement('div');
        todoNavContainer.className = 'sidebar-nav';
        todoNavContainer.id = 'todo-nav-container';

        const todoNavHeading = document.createElement('div');
        todoNavHeading.className = 'sidebar-heading';
        todoNavHeading.id = 'todo-nav-heading';
        todoNavHeading.textContent = 'Due By';

        const todoNavBtnContainer = document.createElement('div');
        todoNavBtnContainer.classList = 'sidebar-content-container';
        todoNavBtnContainer.id = 'todo-nav-btn-container';

        const todayNavBtn = document.createElement('button');
        todayNavBtn.className = 'todo-nav-btn sidebar-btn';
        todayNavBtn.id = 'today-nav-btn';
        todayNavBtn.textContent = 'Today';
        // todayBtnController();

        const nextSevenDaysNavBtn = document.createElement('button');
        nextSevenDaysNavBtn.className = 'todo-nav-btn sidebar-btn';
        nextSevenDaysNavBtn.id = 'next-seven-days-nav-btn';
        nextSevenDaysNavBtn.textContent = 'Next 7 Days';
        // nextSevenDaysBtnController();

        const allTodosNavBtn = document.createElement('button');
        allTodosNavBtn.className = 'todo-nav-btn sidebar-btn';
        allTodosNavBtn.id = 'all-todos-nav-btn';
        allTodosNavBtn.textContent = 'All Todos';
        // allToDosBtnController();

        todoNavBtnContainer.appendChild(todayNavBtn);
        todoNavBtnContainer.appendChild(nextSevenDaysNavBtn);
        todoNavBtnContainer.appendChild(allTodosNavBtn);

        todoNavContainer.appendChild(todoNavHeading);
        todoNavContainer.appendChild(todoNavBtnContainer);

        document.querySelector('.sidebar').appendChild(todoNavContainer);
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //Add project nav section
        const projectNavContainer = document.createElement('div');
        projectNavContainer.className = 'sidebar-nav';
        projectNavContainer.id = 'project-nav-container';

        const projectNavHeading = document.createElement('div');
        projectNavHeading.className = 'sidebar-heading';
        projectNavHeading.id = 'project-nav-heading';
        projectNavHeading.textContent = 'Projects';

        const projectNavBtnContainer = document.createElement('div');
        projectNavBtnContainer.className = 'sidebar-content-container';
        projectNavBtnContainer.id = 'project-nav-btn-container';

        const projectAddBtnConainer = document.createElement('div');
        projectAddBtnConainer.id = 'project-add-btn-container';

        projectNavContainer.appendChild(projectNavHeading);
        projectNavContainer.appendChild(projectNavBtnContainer);
        projectNavContainer.appendChild(projectAddBtnConainer);

        document.querySelector('.sidebar').appendChild(projectNavContainer);

        refreshProjects();
        makeAddProjectBtn();
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //Add Note nav Section
        const noteNavContainer = document.createElement('div');
        noteNavContainer.className = 'sidebar-nav';
        noteNavContainer.id = 'note-nav-container';

        const noteNavBtn = document.createElement('button');
        noteNavBtn.className = 'note-nav-btn sidebar-btn';
        noteNavBtn.id = 'note-btn';
        noteNavBtn.textContent = 'Notes';

        noteNavContainer.appendChild(noteNavBtn);

        document.querySelector('.sidebar').appendChild(noteNavContainer);

        noteBtnController();
        makeAddNoteBtn();
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        todayBtnController();
        nextSevenDaysBtnController();
        allToDosBtnController();
        document.getElementById('all-todos-nav-btn').click();
    });
}

export {
    renderAll,
};