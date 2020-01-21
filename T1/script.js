// 1. Add event listener for button click
// On button click show div "<div class="invisible">I'm visible!</div>"
// 2. Extend event listener for button click (toggle)
// On button click div becomes visible and button value becomes "Hide" instead of "Show".
// On the second click div becomes invisible and button value becomes "Show" instead of "Hide"

// Tips:
// What is document and how to find an element:
// https://www.w3schools.com/js/js_htmldom_document.asp
// What is an evenet listener:
// https://www.w3schools.com/js/js_htmldom_eventlistener.asp
// How to add/remove a class from the element:
// https://www.w3schools.com/howto/howto_js_add_class.asp
// https://www.w3schools.com/howto/howto_js_remove_class.asp

function showDiv() {
    let div = document.querySelector('div');
    div.classList.toggle('invisible')
    button.innerHTML = button.innerHTML == "Show" ? "Hide" : "Show";
};

let button = document.getElementById('button');
button.addEventListener('click', showDiv);