const main = document.querySelector('#main');
const header = document.querySelector('#header');

if (main && header) {
    main.appendChild(header);
} else {
    console.error('Either #main or #header element is not found in the DOM.');
}