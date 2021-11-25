import throttle from 'lodash.throttle';
import { debounce } from 'debounce';

const form = document.querySelector(".feedback-form");
const formInput = document.querySelector("input");
const formTextarea = document.querySelector("textarea");
const formMessage = {email: "", message: ""};

form.addEventListener("input", throttle(saveFunction, 500));

function saveFunction(event) {
    
    if (event.target === formInput) {
        formMessage.email = event.target.value;
    }
    else if (event.target === formTextarea) {
        formMessage.message = event.target.value;
    }

    localStorage.setItem("feedback-form-state", JSON.stringify(formMessage));
    console.log("SaveMessage", formMessage);

}
const localSave = JSON.parse(localStorage.getItem("feedback-form-state"));

document.addEventListener("DOMContentLoaded", update())

function update() {
    formInput.value = localSave?.email || "";
    formTextarea.value = localSave?.message || "";
    console.log(localSave);

}

form.addEventListener("submit", submitFunction);

function submitFunction(event) {
    event.preventDefault();
   
    console.log("SubmitMessage", formMessage);
    event.target.reset();
    localStorage.removeItem("feedback-form-state");
}


