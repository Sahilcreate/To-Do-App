# To-Do-App Development Log

## Requirements
* At minimum the todo-items are going to have title, description, dueDate and priority.
* Todo list should have projects or separate lists of todos.
* When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. Users should be able to create new projects and choose which project their todos go into.
* The app should be able to do the following: 
  * View all projects.
  * View all todos in each project (probably just the title and duedate… perhaps changing color for different priorities).
  * Expand a single todo to see/edit its details.
  * Delete a todo.
* You should add some persistence to this todo app using the Web Storage API.
  * Make sure your app doesn't creash if the data you may want to retrieve from localStorage isn't there!
  * Keep in mind you cannot store functions in JSON, so you’ll have to figure out how to add methods back to your object properties once you fetch them. Good luck!

## Initial Plan


## Development Log
### July 08, 2024
* Set up the webpack environment
* Decide which options to provide (i.e. dueDates nav, project nav, notes, a dialog for every todo which contain its title, description, checklist {if any} and it's priority)
* Create a visual plan of the app

### July 10, 2024
* Added a button which opens a new dialog box which further contains title, description, select options, and an editable checklist.

### July 11, 2024
* Added other buttons and span (without functionality) 

### July 12, 2024
* Added functionality to `Add Project` button
* Add Unique id's to todo, project and note classes

### July 13, 2024
* Added an edit button to change name of project and hence respective name in todos
* Added `controller.js` for easy handling of code

### July 14, 2024
* Added functionality to `Add Note` button
* Added editable dialog box for `To-dos` and `Notes`
* Handled the storage mess in `storagehandler.js`

>I forgot to add devLog regularly that's why the vague logs.

### July 15, 2024 - July 20, 2024
>I was shifting so wasn't able to do much.

### July 26, 2024
* Life happened. Just completed it. I am tired of it.
>NOTE TO SELF: learn CSS and design.