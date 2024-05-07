const buffer = new Array(24);

for (let i = 0; i < 24; i++) {
    buffer[i] = new Array(40);
}

function calculateBuffer() {
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 40; j++) {
            buffer[i][j] = traceRay(i * 30, j * 30);
        }
    }
}

function traceRay(x, y) {
    return "A";
}

function displayBuffer() {
    const screen = buffer.reduce((acc, line) => {
        return acc + "\n" + line.join('');
    }, "");
    const main = document.getElementById("main");
    main.textContent = screen;
}

calculateBuffer();
displayBuffer();
