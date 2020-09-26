console.log('Client side javascript file is loaded!');

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console.log(data.error);
//         }
//         else {
//             console.log(data.forecast);
//         }
//     })
// })

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOneContainer = document.querySelector('#message-1');
const messageTwoContainer = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('testing submit: ', searchInput.value);
    
    messageOneContainer.textContent = "Loading..."
    messageTwoContainer.textContent = '';


    fetch('http://localhost:3000/weather?address=' + searchInput.value).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOneContainer.textContent = data.error;
            }
            else {
                messageOneContainer.innerHTML = data.location;
                messageTwoContainer.innerHTML = data.forecast;
            }
        })
    })
})