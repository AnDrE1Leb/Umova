


const Password = document.getElementById("Password");
const Eye = document.getElementById("Eye");

Eye.addEventListener('click', function (){
    if (Password.type === "password") {
        Password.type = "text";
        Eye.classList.add("off");
    } else {
        Password.type = "password";
        Eye.classList.remove("off");
    }
})


"use strict"

const forms = document.forms;
const form = document.getElementById('form');

form.addEventListener('submit', formSubmitAction);

// if (forms.length) {
//     for (let i = 0; i <forms.length; i++) {
//         forms[i].addEventListener('submit', formSubmitAction);
//     }
// }



async function formSubmitAction(e) {
    e.preventDefault();

    let error = formValidate(e);

    const form = e.target;
    const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : "#";
    const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : "GET";
    const formData = new FormData(form);

    form.classList.add('form-sending');

    if (error === 0) {
        const response = await fetch(formAction, {
            method: formMethod,
            body: formData
        })
        if (response.ok) {
            alert('Form submitted');
            form.classList.remove('form-sending');
            form.reset();
        }else {
            alert('Error');
            form.classList.remove('form-sending');
        }
    }
}


function formValidate(e) {
    e.preventDefault();
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        formRemoveError(input);

        if (input.classList.contains('_email')) {
            if (input.value === '') {
                formAddError(input);
                error++;
            } else if (emailTest(input)) {
                formAddEmailError(input);
                error++;
            }
        } else if (input.classList.contains('tel')) {
            if (input.value === '') {
                formAddError(input);
                error++;
            } else if (phoneTest(input)) {
                formAddPhoneError(input);
                error++;
            }
        }
        else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
            formAddError(input);
            error++;
        } else {
            if (input.value === '') {
                formAddError(input);
                error++;
            }
        }
    }
    return error;
}

function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}

function formAddEmailError(input) {
    input.parentElement.classList.add('_error-email');
    input.classList.add('_error');
}

function formAddPhoneError(input) {
    input.parentElement.classList.add('_error-phone');
    input.classList.add('_error');
}


function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.parentElement.classList.remove('_error-email');
    input.parentElement.classList.remove('_error-phone');
    input.classList.remove('_error');
}

function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

function phoneTest(input) {
    return !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(input.value);
}