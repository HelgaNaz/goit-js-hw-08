import throttle from 'lodash.throttle';

const form = document.querySelector(".feedback-form");
const formInput = document.querySelector("input");
const formTextarea = document.querySelector("textarea");
const formMessage = {};

form.addEventListener("input", throttle(saveFunction, 500));

function saveFunction(event) {
    event.preventDefault();
    const {elements: { email, message }} = event.currentTarget;

    if (email.value === "" || message.value === "") {
        return console.log("Please fill in all the fields!");
    };

    formMessage.email = email.value;
    formMessage.message = message.value;
    
    localStorage.setItem("feedback-form-state", JSON.stringify(formMessage));
    console.log("SaveMessage", formMessage);
}
const localSave = JSON.parse(localStorage.getItem("feedback-form-state"));

if(localSave) {
    formInput.value = localSave.email;
    formTextarea.value = localSave.message;
}

form.addEventListener("submit", submitFunction);

function submitFunction(event) {
    event.preventDefault();
    event.currentTarget.reset();
    localStorage.removeItem("feedback-form-state");
    console.log("SubmitMessage", formMessage);
}
