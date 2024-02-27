async function getNewImage() {
    return await fetch(' https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(msg => msg.message );
}
getNewImage().then(data => {
    const portrait = document.getElementById('portrait');
    const img = document.createElement('img');
    img.src = data;
    portrait.appendChild(img);
});

//TODO name from fetch