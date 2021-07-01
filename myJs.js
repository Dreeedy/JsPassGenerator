/* 01 - Variables - Open */
let lowercaseArr = [];
let uppercaseArr = [];
let numbersArr = [];
let specialSymbolsArr = [];
/* 02 - Variables - Close */

/* 01 - PageElements - Open */
let checkLowercase = null;
let checkUppercase = null;
let checkNumbers = null;
let checkSpecialSymbols = null;

let passwordLengthLine = null;
let passwordLengthNumber = null;
let passwordField = null;
/* 02 - PageElements - Close */

// hello

window.addEventListener('load', function () {
    loadSumbols();
    loadPageElements();
    checkLowercase.checked = true;
    checkUppercase.checked = true;
    checkNumbers.checked = true;
    checkSpecialSymbols.checked = true;
})

function loadSumbols() {
    lowercaseArr = loadLowercase();
    uppercaseArr = loadUppercase();
    numbersArr = loadNumbers();
    specialSymbolsArr = loadSpecialsymbols();
}

function loadPageElements() {
    checkLowercase = document.getElementById("checkLowercase");
    checkUppercase = document.getElementById("checkUppercase");
    checkNumbers = document.getElementById("checkNumbers");
    checkSpecialSymbols = document.getElementById("checkSpecialSymbols");

    passwordLengthLine = document.getElementById("passwordLengthLine");
    passwordLengthNumber = document.getElementById("passwordLengthNumber");
    passwordField = document.getElementById("passwordField");
}

function getPasswordLengthNumber() {
    passwordLengthNumber.value = passwordLengthLine.value;
    generatePassword();
}

function generatePassword() {
    let localAllSymbolsArr = [];
    if (checkLowercase.checked) {
        localAllSymbolsArr = localAllSymbolsArr.concat(lowercaseArr);
    }
    if (checkUppercase.checked) {
        localAllSymbolsArr = localAllSymbolsArr.concat(uppercaseArr);
    }
    if (checkNumbers.checked) {
        localAllSymbolsArr = localAllSymbolsArr.concat(numbersArr);
    }
    if (checkSpecialSymbols.checked) {
        localAllSymbolsArr = localAllSymbolsArr.concat(specialSymbolsArr);
    }

    let newPassword = '';
    for (let i = 0; i < passwordLengthNumber.value; i++) {
        let newNumber = randomInteger(0, localAllSymbolsArr.length - 1);
        newPassword += localAllSymbolsArr[newNumber];
    }

    passwordField.value = newPassword;
}

function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function copy() {
    passwordField.select();
    document.execCommand("copy");
}

function switchCheckBoxes() {
    if (!checkLowercase.checked && !checkUppercase.checked && !checkNumbers.checked && !checkSpecialSymbols.checked) {
        checkLowercase.checked = true;
    }
}

function loadLowercase() {
    return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
}

function loadUppercase() {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
}

function loadNumbers() {
    return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
}

function loadSpecialsymbols() {
    return ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '}', '[', ']', '\\', '|', ':', ';', '\"', '\'', '<', '>', ',', '.', '/', '?'];
}