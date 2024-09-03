export function arraySplit(arr, Size) {
    const result = [];

    for (let i = 0; i < arr.length; i += Size) {
        const chunk = arr.slice(i, i + Size);
        result.push(chunk);
    }

    return result;
}

export function getRandomElements(arr, numElements) {
    let shuffled = arr.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, numElements);
}

export function proximitydetector(i, j, fieldMatrix) {
    let x = fieldMatrix.length - 1, y = fieldMatrix[0].length - 1
    let temp = [[i - 1, j - 1], [i - 1, j], [i - 1, j + 1], [i, j - 1], [i, j + 1], [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]]
    let count = 0
    temp.forEach(value => {
        if ((value[0] >= 0 && value[0] <= x) && (value[1] >= 0 && value[1] <= y)) {
            if (fieldMatrix[value[0]][value[1]] === 'X') {
                count++;
            }
        }
    });
    return count
}

export function generateMineField(rows, cols, numMines) {
    const numbers = Array(rows*cols).fill().map((_, i) => i + 1);
    const mines = getRandomElements(numbers, numMines);
    const field = Array(rows*cols).fill(0).map((x, i) => mines.includes(i + 1) ? x = 'X' : 0)
    const fieldMatrix = arraySplit(field, cols);

    fieldMatrix.forEach((element, i) => {
        element.forEach((val, j) => {
            if (fieldMatrix[i][j] !== 'X') { fieldMatrix[i][j] = (val + proximitydetector(i, j, fieldMatrix)) }
        })
    });

    fieldMatrix.forEach((element, i) => {
        element.forEach((val, j) => {
            if (fieldMatrix[i][j] === 0) { fieldMatrix[i][j] = null }
        })
    });

    return fieldMatrix
}

