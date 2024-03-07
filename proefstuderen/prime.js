let list = [];

for (let i = 0; i < 10; i++) {

    addBlock();

}

function addBlock(){
    let block = document.createElement('div');
    block.classList.add('block');
    list.push(block);
}

list.forEach(block => {    
    document.querySelector('.container').appendChild(block);    
});

