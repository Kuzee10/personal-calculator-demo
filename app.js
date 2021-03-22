
function getHistory() {
    return document.getElementById("history-value").innerText;
}


function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}
//console.log(printHistory());

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function printOutput(num) {
    document.getElementById("output-value").innerText = getFormattedNumber(num);

    // if (num=="") {
    //     document.getElementById("output-value").innerText = num;
    //     // this is necessary because ordinarily, when we pass an empty string into num, it returns 0 in the output instead of leaving it blank.
    // }
    // else{
    //     document.getElementById("output-value").innerText = getFormattedNumber(num);
    // }
    
}

console.log(printOutput(2 * 1));


/*printOutput("1200000000"); fails to add comma for better readability. Hence the need to create a new function in the code above. Come in function getFormattedNumber(num)*/

// To Add Comma for better readability:
function getFormattedNumber(num) {
    // Unfortunately, backspacing a negative number (last one) returns NaN. However it is resolved by:
    if (num == "-") {
        return "";
    }
    let n = Number(num);
    let value = n.toLocaleString("en");
    return value;
}

//printOutput(5509876);

// To manipulate the output values, we need to convert the comma separated number back to the original number. Come in reverseNumberFormat().
function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, "")); // This replaces the comma with an empty character.
}

//console.log(reverseNumberFormat(getOutput()));


let operator = document.getElementsByClassName("operator");
    for (let i = 0; i < operator.length; i++) {
        //console.log(operator.length);
        //console.log(operator[i]);
        operator[i].addEventListener('click', function () {
            //alert(`The operator clicked is ${this.id}`);
            //alert("The operator clicked is" + this.id);
            if (this.id=="clear") {
                printHistory("");
                printOutput("")
            }
            else if (this.id=="backspace") {
                // Convert to string
                let output = reverseNumberFormat(getOutput()).toString();
                //Remove the last character using substring function
                if (output) { // if output has a value
                    output = output.substr(0,output.length-1);
                    printOutput(output);
                }
            }

            else{
                let output=getOutput();
                let history=getHistory(); 
                if (output=="" && history!="") {
                    if (isNaN(history[history.length-1])) {
                        history = history.substr(0,history.length-1);
                    }
                };
                
                if (output!="" || history!="") {
                    output= output==""? 
                    output:reverseNumberFormat(output);
                    history=history+output;
                    if (this.id=="=") {
                        let result = eval(history);
                        printOutput(result);
                        printHistory("");
                    }
                    else{
                        history=history+this.id;
                        printHistory(history);
                        printOutput("");
                    }
                }
            }
        }); 
}

let number = document.getElementsByClassName("number");
    for (let i = 0; i < number.length; i++) {
        //console.log(number.length);
        //console.log(number[i]);
        number[i].addEventListener('click', function () {
            //alert(`The number clicked is ${this.id}`);
            let output = reverseNumberFormat(getOutput());
            if (output!=NaN) { // if output is a number
                output = output + this.id;
                printOutput(output);
            }
    }); 
}
