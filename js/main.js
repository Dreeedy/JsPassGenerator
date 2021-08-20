/* 01 - Variables - Open */
const MAX_PASSWORD_LENGHT = 256;
const MAX_COUNT_DUPLICATES = 27;



let lowercaseArr = [];
let uppercaseArr = [];
let numbersArr = [];
let specialSymbolsArr = [];
let localAllCharsArr = [];

let newPassword = '';
let duplicatesCount = 0;
/* 02 - Variables - Close */

/* 01 - PageElements - Open */
let checkLowercase = null;
let checkUppercase = null;
let checkNumbers = null;
let checkSpecialSymbols = null;
let checkSpecialUnicleSymbols = null;

let passwordLengthLine = null;
let passwordLengthNumber = null;
let passwordField = null;
/* 02 - PageElements - Close */



window.addEventListener('load', function () {

    loadSumbols();
    loadPageElements();

    checkLowercase.checked = true;
    checkUppercase.checked = true;
    checkNumbers.checked = true;
    checkSpecialSymbols.checked = true;
    checkSpecialUnicleSymbols.checked = true;    

    generatePassword();
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
    checkSpecialUnicleSymbols = document.getElementById("checkSpecialUnicleSymbols");

    passwordLengthLine = document.getElementById("passwordLengthLine");
    passwordLengthNumber = document.getElementById("passwordLengthNumber");
    passwordField = document.getElementById("passwordField");
}
function getPasswordLengthNumber() {

    passwordLengthNumber.value = passwordLengthLine.value;
    generatePassword();
}
function generatePassword() {

    newPassword = '';
    localAllCharsArr = [];  
    
    if (checkLowercase.checked) {

        localAllCharsArr = localAllCharsArr.concat(lowercaseArr);
    }
    if (checkUppercase.checked) {

        localAllCharsArr = localAllCharsArr.concat(uppercaseArr);
    }
    if (checkNumbers.checked) {

        localAllCharsArr = localAllCharsArr.concat(numbersArr);
    }
    if (checkSpecialSymbols.checked) {

        localAllCharsArr = localAllCharsArr.concat(specialSymbolsArr);
    }

    // пароль не может быть длинее чем MAX_PASSWORD_LENGHT
    if (passwordLengthNumber.value > MAX_PASSWORD_LENGHT) {

        passwordLengthNumber.value = MAX_PASSWORD_LENGHT; 
    }

    // генерация no secure пароля
    for (let i = 0; i < passwordLengthNumber.value; i++) {

        newPassword += getNewChar();
    }

    // вычисление кол-ва допустимых дубликатов
    for (var i = 1; i < MAX_COUNT_DUPLICATES; i++) {

        if (newPassword.length <= (localAllCharsArr.length * i)) {

            duplicatesCount = i;
            break;
        }
    }  

    // генерация secure пароля
    if (checkSpecialUnicleSymbols.checked == true) {

        minimizeDuplicatesCount();
    }   

    passwordField.value = newPassword;
}
// заменяет повторяющиеся символы на новые
function minimizeDuplicatesCount() {
 
    for (let firstChar of newPassword) {

        let duplicatesfound = 0;

        let secondIndex = 0;
        for (let secondChar of newPassword) {

            if (secondChar == firstChar) {

                duplicatesfound++;

                if (duplicatesfound > duplicatesCount) {

                    let newChar = getNewChar();

                    // заменяю старый символ на новый
                    newPassword = setCharAt(newPassword, secondIndex, newChar);
                    duplicatesfound = 0;
                    minimizeDuplicatesCount();
                }
            }
            secondIndex++;
        }        
    }
}
function getNewChar() {

    let newNumber = generateRandomInteger(0, localAllCharsArr.length - 1);
    let newChar = localAllCharsArr[newNumber];

    return newChar;
}
// заменяет символ в строке и возвращает новую строку
function setCharAt(str, index, chr) {

    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}
// получить случайное число от (min-0.5) до (max+0.5)
function generateRandomInteger(min, max) {
    
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
// копирует пароль в буфер обмена
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