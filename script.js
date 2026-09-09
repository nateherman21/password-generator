const passwordDisplay = document.getElementById('passwordDisplay');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');

const numCheck = document.getElementById('includeNumber');
const specCheck = document.getElementById('includeSpecial');

const numberCount = document.getElementById('numberCount');
const specialCount = document.getElementById('specialCount');
const maxLengthInput = document.getElementById('maxLength');

const words = [
    "correct", "horse", "battery", "desk", "moon", "ocean",
    "cat", "sunny", "cup", "dog", "thunder", "quantum",
    "nebula", "alpha", "bravo", "charlie", "falcon",
    "shadow", "rocket", "tiger", "storm", "ember"
];

const specialChars = "!@#$%^&*";

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function getRandomSpecialChar() {
    return specialChars[Math.floor(Math.random() * specialChars.length)];
}

function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function toggleCountInputs() {
    numberCount.disabled = !numCheck.checked;
    specialCount.disabled = !specCheck.checked;
}

generateBtn.addEventListener('click', function () {
    const selectedFormat = document.querySelector('input[name="formatOption"]:checked').value;
    const maxLength = clamp(parseInt(maxLengthInput.value, 10) || 24, 8, 50);

    const numAmount = numCheck.checked
        ? clamp(parseInt(numberCount.value, 10) || 0, 0, 4)
        : 0;

    const specAmount = specCheck.checked
        ? clamp(parseInt(specialCount.value, 10) || 0, 0, 4)
        : 0;

    let extras = "";

    for (let i = 0; i < numAmount; i++) {
        extras += Math.floor(Math.random() * 10);
    }

    for (let i = 0; i < specAmount; i++) {
        extras += getRandomSpecialChar();
    }

    const remainingLength = maxLength - extras.length;

    if (remainingLength <= 0) {
        passwordDisplay.value = extras.slice(0, maxLength);
        return;
    }

    let passphraseWords = [];
    let basePassphrase = "";

    while (true) {
        const nextWord = getRandomWord();
        let testWords = [...passphraseWords, nextWord];
        let testPhrase = "";

        if (selectedFormat === "hyphen") {
            testPhrase = testWords.join("-");
        } else if (selectedFormat === "pascal") {
            testPhrase = testWords.map(word => capitalizeWord(word)).join("");
        } else {
            testPhrase = testWords.join("");
        }

        if (testPhrase.length <= remainingLength) {
            passphraseWords.push(nextWord);
            basePassphrase = testPhrase;
        } else {
            break;
        }

        if (passphraseWords.length >= 4) {
            break;
        }
    }

    let finalPassphrase = basePassphrase + extras;
    passwordDisplay.value = finalPassphrase;
});

copyBtn.addEventListener('click', function () {
    if (passwordDisplay.value !== "") {
        navigator.clipboard.writeText(passwordDisplay.value)
            .then(() => {
                alert("Passphrase copied to clipboard");
            })
            .catch(() => {
                alert("Failed to copy passphrase");
            });
    }
});

numCheck.addEventListener('change', toggleCountInputs);
specCheck.addEventListener('change', toggleCountInputs);
toggleCountInputs();