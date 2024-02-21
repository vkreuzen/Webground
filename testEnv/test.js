


window.onload = (event) => {
  console.log("page is fully loaded");



  for (let i = 1; i <= 100; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.innerHTML = `<p>${i}</p>`;
    document.getElementById('grid').appendChild(cell);
  }





};
