"use strict";
function Matrix(matrix) {
    const n = matrix.length;
    let diagonal1 = [];
    let diagonal2 = [];
    for (let i = 0; i < n; i++) {
        diagonal1.push(matrix[i][i]);
        diagonal2.push(matrix[i][n - 1 - i]);
    }
    const totalDiagonal1 = Math.abs(diagonal1.reduce((a, b) => a + b));
    const totalDiagonal2 = Math.abs(diagonal2.reduce((c, d) => c + d));
    const result = totalDiagonal1 - totalDiagonal2;
    console.log(`Diagonal pertama = ${diagonal1.join(" + ")} = ${totalDiagonal1}`);
    console.log(`Diagonal kedua = ${diagonal2.join(" + ")} = ${totalDiagonal2}`);
    console.log(`Maka hasilnya adalah ${totalDiagonal1} - ${totalDiagonal2} = ${result}`);
    return result;
}
Matrix([
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9],
]);
Matrix([
    [4, 4, 3],
    [3, 8, 5],
    [9, 3, 1],
]);
