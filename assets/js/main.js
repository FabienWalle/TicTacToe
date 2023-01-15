let cell = document.querySelectorAll('.cell');
for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener("click", (event) => {
        tag(event.target);
    });
}

let turn = true;
let playerOne = 0;
let playerTwo = 0;
let drawScore = 0;
let grid = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function reset() {
    let cells = document.querySelectorAll('.cell');
    for (let index = 0; index < cells.length; index++) {
        cells[index].innerHTML = "";
    }
}

function tag(element) {
    if (turn == true) {
        let circle = document.createElement('img');
        circle.src = `./circle.jpg`;
        element.appendChild(circle);
        win();
        draw()
        turn = false;
    } else if (turn == false && document.getElementById("checkbox").checked == false) {
        let cross = document.createElement('img');
        cross.src = `./cross.jpg`;
        element.appendChild(cross);
        win();
        draw();
        turn = true;
    } else if (turn == false && document.getElementById("checkbox").checked == true) {
        computer();
        win();
        draw();
    }
}

function win() {
    let cells = document.querySelectorAll('.cell')
    for (let i = 0; i < grid.length; i++) {
        if (cells[grid[i][0]].innerHTML == cells[grid[i][1]].innerHTML && cells[grid[i][1]].innerHTML == cells[grid[i][2]].innerHTML) {
            if (cells[grid[i][0]].innerHTML != '') {
                let symbol = cells[grid[i][0]].childNodes[0].src;
                symbol = symbol.split("/");
                symbol = symbol[symbol.length - 1];
                if (symbol == "circle.jpg") {
                    playerOne++;
                    document.querySelector("#playerOneScore").innerText = playerOne;
                    reset();
                } else if (symbol == "cross.jpg") {
                    playerTwo++;
                    document.querySelector("#playerTwoScore").innerText = playerTwo;
                    reset();
                }
            }
        }
    }
}

function draw() {
    let images = document.querySelectorAll('img');
    if (images.length == 9) {
        reset()
        drawScore++;
        document.querySelector("#drawScore").innerText = drawScore;
    };
}

function computer() {
    let cells = document.querySelectorAll('.cell');
    let random = randomNumber(0, 8);
    let cross = document.createElement('img');
    cross.src = `../cross.jpg`;
    while (true) {
        if (cells[random].innerHTML!="") {
            random = randomNumber(0, 8); 
        } else {
            cells[random].appendChild(cross);
            turn = true;
            break
        }
    }
}


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
