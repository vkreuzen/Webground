let img;
let title;

async function getNewImage() {
    return await fetch(' https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(msg => msg.message);
}

async function getNewName() {
    return await fetch('https://randomuser.me/api/?inc=name,nat')
        .then(response => response.json())
        .then(msg => msg.results[0].name.title+' '+msg.results[0].name.first+' '+msg.results[0].name.last);
}

//wait for both promises to fulfill
function updateNewRandomDog() {
    Promise.all([getNewImage(),getNewName()])
        .then((results) => {
            img.src = results[0];
            document.querySelector('.name').innerHTML = results[1];
        });//catch errors?
}

//results do not wait for one another
function updateRandomDogAndRandomName() {    
    getNewImage().then(data => {
        img.src = data;
    });
    getNewName().then(data => {
        document.querySelector('.name').innerHTML = data;
    });
}

function initialiseSwiper(){
    img = document.createElement('img');
    title = document.getElementById('name');
    document.getElementById('portrait').appendChild(img);
    updateNewRandomDog();
}

document.querySelector('.next').addEventListener('click', e => {
    updateNewRandomDog();
}
);

initialiseSwiper();