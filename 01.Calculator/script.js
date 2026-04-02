var numberButtonsEl = document.querySelectorAll(".numberButton");//
var currentResultScreenEl = document.getElementById("current-result");//
var currentNumberScreenEl = document.getElementById("current-number");//
var clearButtonEl = document.getElementById("clear");
var deleteButtonEl = document.getElementById("delete");
var equalsButtonEl = document.getElementById("equals");//
var operationButtonsEl = document.querySelectorAll(".operation");

var resultEl = document.getElementById("result");


// dobavljanje svih elemenata   OK
// unosenje brojeva   OK
// unosenje operacija   OK
// delete   OK
// clear   OK
// racunanje   OK

// broj se upisuje u variablu number konkatenacijom stringa   OK
// kad se stisne operator, variabla number se upisuje u lastNumber i prazni   OK
// posto je result prazan, u result se upisuje lastNumber + operation   OK
// unosi se novi broj  i upisuje u number, kad se klinke na operator i taj broj se upisuje u lastNumber   OK
// vrednost result je sada (result - operacija - lastNumber) + operation     OK

// provera da li broj ima decimalu. ako ima ne sme da se unese nova tacka   OK
// provera da li je prvo odabrana operacija. ako je prvo operacija nista se ne desava jer mora prvo broj da se odabere   OK
// ako postoji i prethodni broj i operacija na gornjem ekranu i broj na donjem ekranu, racuna se rezultat a na broj i operator na gornjem ekranu se konkatenacijom dodaje novi broj i tako redom dok se ne stisne jednako. na gornjem ekranu   OK
// provera da li je uneta vise puta uzastopno operacija - moze samo jednom   OK
// stisnem jednako, rezultat se uspisuje u donji ekran a gornji ekran i svi brojevi i operacije se prazne   OK
// pri biranju C brisu se vrednosti brojeva i oba ekrana   OK
// pre delete se brise vrednost variable number i donjeg ekrana   OK
// ograniciti broj karaktera na donjem ekranu i dozvoliti da broj ide u dva reda   OK
// ograniciti broj karaktera na gornjem ekranu na samo jedan red   ???



var lastNumber = "";
var number = "";
var result = "";
var operation = "";
var lastOperation = "";
var haveDecimal = false;
var maxLength = 27;


for (var i = 0; i < numberButtonsEl.length; i++) {

    numberButtonsEl[i].addEventListener("click", function (event) {
        if (number.length > maxLength) {
            return;
        }
        if (event.target.innerText === "." && !haveDecimal) {
            haveDecimal = true;
        }
        else if (event.target.innerText === "." && haveDecimal) {
            return;
        }
        number += event.target.innerText;
        currentNumberScreenEl.innerText = number;

    })
}

for (var i = 0; i < operationButtonsEl.length; i++) {
    operationButtonsEl[i].addEventListener("click", function (event) {
        operation = event.target.innerText;
        if (!number) {
            return;
        }
        if (number && lastNumber && lastOperation) {
            calculate();
        }
        else {
            result = parseFloat(number);
        }
        haveDecimal = false;
        lastNumber += number + " " + operation + " ";
        currentResultScreenEl.innerText = lastNumber;
        currentNumberScreenEl.innerText = "";
        number = "";
        lastOperation = operation;

    });
}

function calculate() {
    if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(number)
    }
    else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(number)
    }
    else if (lastOperation === "*") {
        result = parseFloat(result) * parseFloat(number)
    }
    else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(number)
    }
}

equalsButtonEl.addEventListener("click", function () {
    if (!number || !lastNumber) {
        return
    }
    haveDecimal = false;
    calculate();
    lastNumber += number + " " + operation + " ";
    currentNumberScreenEl.innerText = result;
    currentResultScreenEl.innerText = "";
    number = result;
    lastNumber = "";


})


clearButtonEl.addEventListener("click", function () {
    currentNumberScreenEl.innerText = "0";
    currentResultScreenEl.innerText = "0";
    number = "";
    lastNumber = "";
    result = "";

});

deleteButtonEl.addEventListener("click", function () {
    number = number.slice(0, -1);
    currentNumberScreenEl.innerText = number;
});
