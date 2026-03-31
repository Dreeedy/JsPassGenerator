/* 01 - Variables - Open */
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 256;
const DEFAULT_PASSWORD_LENGTH = 8;
const PASSWORD_LENGTH_STEP = 2;
const CRYPTO_RANGE = 0x100000000;

let lowercaseArr = [];
let uppercaseArr = [];
let numbersArr = [];
let specialSymbolsArr = [];
let localAllCharsArr = [];
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



window.addEventListener('load', function () {

    loadSymbols();
    loadPageElements();

    checkLowercase.checked = true;
    checkUppercase.checked = true;
    checkNumbers.checked = true;
    checkSpecialSymbols.checked = true;

    syncPasswordLengthInputs(DEFAULT_PASSWORD_LENGTH);
    generatePassword();
});
function loadSymbols() {

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
function getPasswordLengthLine() {

    generatePassword();
}
function generatePassword() {

    const selectedCharGroups = getSelectedCharGroups();
    const normalizedPasswordLength = normalizePasswordLength(passwordLengthNumber.value, selectedCharGroups.length);
    const passwordChars = [];

    syncPasswordLengthInputs(normalizedPasswordLength);

    for (const charGroup of selectedCharGroups) {

        passwordChars.push(getNewChar(charGroup));
    }

    while (passwordChars.length < normalizedPasswordLength) {

        passwordChars.push(getNewChar(localAllCharsArr));
    }

    shuffleArray(passwordChars);
    passwordField.value = passwordChars.join('');
}
function getSelectedCharGroups() {

    const selectedCharGroups = [];
    localAllCharsArr = [];

    if (checkLowercase.checked) {

        selectedCharGroups.push(lowercaseArr);
        localAllCharsArr = localAllCharsArr.concat(lowercaseArr);
    }
    if (checkUppercase.checked) {

        selectedCharGroups.push(uppercaseArr);
        localAllCharsArr = localAllCharsArr.concat(uppercaseArr);
    }
    if (checkNumbers.checked) {

        selectedCharGroups.push(numbersArr);
        localAllCharsArr = localAllCharsArr.concat(numbersArr);
    }
    if (checkSpecialSymbols.checked) {

        selectedCharGroups.push(specialSymbolsArr);
        localAllCharsArr = localAllCharsArr.concat(specialSymbolsArr);
    }

    if (selectedCharGroups.length === 0) {

        checkLowercase.checked = true;
        selectedCharGroups.push(lowercaseArr);
        localAllCharsArr = localAllCharsArr.concat(lowercaseArr);
    }

    return selectedCharGroups;
}
function normalizePasswordLength(passwordLengthValue, minimumLength = MIN_PASSWORD_LENGTH) {

    let normalizedPasswordLength = Number.parseInt(passwordLengthValue, 10);
    const effectiveMinimumLength = Math.max(MIN_PASSWORD_LENGTH, minimumLength);

    if (!Number.isFinite(normalizedPasswordLength)) {

        normalizedPasswordLength = DEFAULT_PASSWORD_LENGTH;
    }

    normalizedPasswordLength = Math.min(MAX_PASSWORD_LENGTH, Math.max(effectiveMinimumLength, normalizedPasswordLength));

    if (normalizedPasswordLength % PASSWORD_LENGTH_STEP !== 0) {

        normalizedPasswordLength++;
    }

    if (normalizedPasswordLength > MAX_PASSWORD_LENGTH) {

        normalizedPasswordLength = MAX_PASSWORD_LENGTH;
    }

    return normalizedPasswordLength;
}
function syncPasswordLengthInputs(passwordLength) {

    passwordLengthLine.value = passwordLength;
    passwordLengthNumber.value = passwordLength;
}
function getNewChar(charArr) {

    let newNumber = generateRandomInteger(charArr.length);
    let newChar = charArr[newNumber];

    return newChar;
}
function shuffleArray(charArr) {

    for (let i = charArr.length - 1; i > 0; i--) {

        let newIndex = generateRandomInteger(i + 1);
        [charArr[i], charArr[newIndex]] = [charArr[newIndex], charArr[i]];
    }
}
// РїРѕР»СѓС‡РёС‚СЊ РєСЂРёРїС‚РѕСЃС‚РѕР№РєРѕРµ СЃР»СѓС‡Р°Р№РЅРѕРµ С‡РёСЃР»Рѕ РѕС‚ 0 РґРѕ (maxExclusive - 1)
function generateRandomInteger(maxExclusive) {

    if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) {

        throw new Error('Character pool must contain at least one symbol.');
    }

    const cryptoApi = globalThis.crypto;

    if (!cryptoApi || typeof cryptoApi.getRandomValues !== 'function') {

        throw new Error('Web Crypto API is unavailable in this browser.');
    }

    let randomValues = new Uint32Array(1);
    let maxUnbiasedValue = CRYPTO_RANGE - (CRYPTO_RANGE % maxExclusive);
    let randomNumber = 0;

    do {

        cryptoApi.getRandomValues(randomValues);
        randomNumber = randomValues[0];
    } while (randomNumber >= maxUnbiasedValue);

    return randomNumber % maxExclusive;
}
// РєРѕРїРёСЂСѓРµС‚ РїР°СЂРѕР»СЊ РІ Р±СѓС„РµСЂ РѕР±РјРµРЅР°
function copy() {

    // if Clipboard API available
    if (navigator.clipboard) {

        navigator.clipboard.writeText(passwordField.value);
    }
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
