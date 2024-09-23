"use strict";
const sentence = "Saya sangat senang mengerjakan soal algoritma";
const sentence2 = "Saya berusaha dan berharap dapat diterima oleh perusahaan PT Eigen Tri Mathema";
const sentence3 = "Every opportunity is need to be chased";
function longest(str) {
    if (!str)
        return str;
    let whichChar = "";
    const splittedString = str.split(" ");
    for (let x of splittedString) {
        if (whichChar) {
            if (x.length >= whichChar.length) {
                whichChar = x;
            }
        }
        else {
            whichChar = x;
        }
    }
    const result = `${whichChar}: ${whichChar.length} character`;
    console.log(result);
    return result;
}
longest(sentence); // mengerjakan: 11 character
longest(sentence2); // perusahaan: 10 character
longest(sentence3); // opportunity: 11 character
