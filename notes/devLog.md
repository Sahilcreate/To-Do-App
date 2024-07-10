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

### July 09, 2024
* 