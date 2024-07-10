function domRelatedStuff () {
    const makeAddBtn = function () {
        const addToDoBtn = document.createElement('button');
        addToDoBtn.textContent = "Add ToDo";
        addToDoBtn.id = 'add-to-do-btn';
        addToDoBtn.addEventListener('click', () => {
            makeNewDialogBox();
            document.querySelector('.todo-dialog').showModal();
        })
        document.body.appendChild(addToDoBtn);
    }

    const makeNewDialogBox = function () {
        const todoDialog = document.createElement('dialog');

        const titlePara = document.createElement('p');
        const descriptionPara = document.createElement('p');
        const checklistPara = document.createElement('p');
        const projectSelectionPara = document.createElement('p');
        const prioritySelectionPara = document.createElement('p');
        const btnGroupPara = document.createElement('p');

        const titleLabel = document.createElement('label');
        const descriptionLabel = document.createElement('label');
        const checklistLabel = document.createElement('label');
        const projectSelectionLabel = document.createElement('label');
        const prioritySelectionLabel = document.createElement('label');

        titleLabel.textContent = 'Title';
        descriptionLabel.textContent = 'Description';
        checklistLabel.textContent = 'Checklist';
        projectSelectionLabel.textContent = 'Select Project';
        prioritySelectionLabel.textContent = 'Select Priority';

        const titleInputField = document.createElement('input');
        const descriptionInputField = document.createElement('input');
        const projectSelectionField = document.createElement('select');
        const prioritySelectionField = document.createElement('select');
        const saveTodoBtn = document.createElement('button');
        const deleteTodoBtn = document.createElement('button');

        const checklistInputSection = document.createElement('div');
        const checklistInputField = document.createElement('input');
        const checklistInputAddBtn = document.createElement('button');
        const checklistListField = document.createElement('ul');

        todoDialog.className = 'todo-dialog';
        titlePara.className = 'todo-dialog-para dialog-title-para';
        descriptionPara.className = 'todo-dialog-para dialog-description-para';
        checklistPara.className = 'todo-dialog-para dialog-checklist-para';
        projectSelectionPara.className = 'todo-dialog-para dialog-project-para';
        prioritySelectionPara.className = 'todo-dialog-para dialog-priority-para';
        btnGroupPara.className = 'todo-dialog-para dialog-btn-group-para';
        titleLabel.className = 'todo-dialog-label dialog-title-label';
        descriptionLabel.className = 'todo-dialog-label dialog-description-label';
        checklistLabel.className = 'todo-dialog-label dialog-checklist-label';
        projectSelectionLabel.className = 'todo-dialog-label dialog-project-label';
        prioritySelectionLabel.className = 'todo-dialog-label dialog-priority-label';
        titleInputField.className = 'todo-dialog-input dialog-title-input';
        descriptionInputField.className = 'todo-dialog-input dialog-description-input';
        projectSelectionField.className = 'todo-dialog-select dialog-project-select';
        prioritySelectionField.className = 'todo-dialog-select dialog-priority-select';
        saveTodoBtn.className = 'todo-dialog-btn btn dialog-save-btn';
        deleteTodoBtn.className = 'todo-dialog-btn btn dialog-delete-btn';
        checklistInputSection.className = 'dialog-checklist-input-section';
        checklistInputField.className = 'todo-dialog-input dialog-checklist-input';
        checklistInputAddBtn.className = 'dialog-checklist-add-btn';
        checklistListField.className = 'dialog-checklist-list-field';

        saveTodoBtn.textContent = 'Save';
        deleteTodoBtn.textContent = 'Delete';
        checklistInputAddBtn.textContent = 'Add Item';

        titleInputField.type = 'text';
        descriptionInputField.type = 'textarea';
        checklistInputField.type = 'text';
        
        let projectSelectionOptions = [
            { projectName: 'Default', projectValue: 'default' },
            { projectName: 'Home Fitness', projectValue: 'homefitness' },
            { projectName: 'Gym Fitness', projectValue: 'gymfitness' }
        ];
        projectSelectionOptions.forEach(
            function (optionData) {
                let option = new Option(optionData.projectName, optionData.projectValue);
                projectSelectionField.add(option);
            }
        );

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

        checklistInputSection.appendChild(checklistInputField);
        checklistInputSection.appendChild(checklistInputAddBtn);
        checklistInputSection.appendChild(checklistListField);

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


        todoDialog.appendChild(titlePara);
        todoDialog.appendChild(descriptionPara);
        todoDialog.appendChild(prioritySelectionPara);
        todoDialog.appendChild(checklistPara);
        todoDialog.appendChild(projectSelectionPara);
        todoDialog.appendChild(btnGroupPara);

        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        document.body.appendChild(todoDialog);
        makeChecklist();

    }

    const makeChecklist = function() {
        document.querySelector('.dialog-checklist-add-btn').addEventListener('click', addItem);

        function addItem() {
            const itemText = document.querySelector('.dialog-checklist-input').value;
            if (itemText.trim() !== '') {
                const checklist = document.querySelector('.dialog-checklist-list-field');

                const listItem = createItem(itemText, false);
                checklist.appendChild(listItem);

                document.querySelector('.dialog-checklist-input').value = '';
            }
        }

        function createItem(itemText, isChecked) {
            const listItem = document.createElement('li');
            listItem.className = 'checklist-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = isChecked;
            listItem.appendChild(checkbox);
            
            const itemSpan = document.createElement('span');
            itemSpan.textContent = itemText;
            itemSpan.classList.toggle('checked', isChecked);
            listItem.appendChild(itemSpan);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-item-button';
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
    }

    return { 
        makeAddBtn
    };
}

export { domRelatedStuff };