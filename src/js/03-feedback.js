import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";
const form = document.querySelector(".feedback-form");

const formData = {};
update();

form.addEventListener("input", throttle(saveFunction, 500));

function saveFunction(event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function update() {
    const localData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (localData) {
        Object.entries(localData).forEach(([name, value]) => {
            form.elements[name].value = value;
            formData[name] = value;
        });
  }  
}

form.addEventListener("submit", onSubmit);

function onSubmit(event) {
    event.preventDefault();
    console.log("Отправка формы", formData);
    event.target.reset();
    localStorage.removeItem(STORAGE_KEY);
}



// Пример без объекта
// document.addEventListener("DOMContentLoaded", function() { 

//     document.querySelectorAll('textarea, input').forEach(function(elem) {
      
//         if(elem.value === '') elem.value = localStorage.getItem(elem.name, elem.value);
       
//         elem.addEventListener('input', function() {
//             localStorage.setItem(elem.name, elem.value);
//         })
//     })
// });

