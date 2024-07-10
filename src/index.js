
// (function now() {
//     const submitButton = document.createElement('button');
//     const inputField = document.createElement('input');
//     const showCase = document.createElement('p');

//     inputField.setAttribute("type", "text");
//     inputField.setAttribute("id", "input-field");

//     submitButton.setAttribute("id", "submit-button");
//     showCase.setAttribute("id", "show-case");

//     submitButton.textContent = "submit";

//     document.body.appendChild(inputField);
//     document.body.appendChild(submitButton);
//     document.body.appendChild(showCase);

//     submitButton.addEventListener('click', () => {
//         const inputValue = document.getElementById('input-field').value;
//         localStorage.setItem("inputvalue", inputValue);
//         showCase.textContent = localStorage.getItem("inputvalue");
//     })

// })();

import { renderAll } from "./render";

renderAll();

