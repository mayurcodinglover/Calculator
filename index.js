
var input=document.getElementById('input');
var number=document.querySelectorAll('.numbers div');
var operator=document.querySelectorAll('.operators div');
var result=document.getElementById('result');
var clear=document.getElementById('clear');
var resultDisplayed=false;

//adding click handlers to number buttons
for (var i=0;i<number.length;i++)
{
    
    number[i].addEventListener("click",function(e){
        var currentString=input.innerHTML;
        var lastChar=currentString[currentString.length-1];

        if(resultDisplayed===false){
            input.innerHTML+=e.target.innerHTML;
        }
        else if(resultDisplayed===true && lastChar==="+"|| lastChar==="-"|| lastChar==="*" || lastChar==="/"){
            resultDisplayed=false;
            input.innerHTML+=e.target.innerHTML;
        }
        else{
            resultDisplayed=false;
            input.innerHTML="";
            input.innerHTML+=e.target.innerHTML;
        }
    });
}

//click on operator
for(var i=0;i<operator.length;i++)
{
    operator[i].addEventListener("click",function(e){
        var currentString=input.innerHTML;
        var lastChar=currentString[currentString.length-1];

        if(lastChar==='+' || lastChar==='-' || lastChar==='*' || lastChar==='/'){
            var newString=currentString.substring(0,currentString.length-1)+e.target.innerHTML;
            input.innerHTML=newString;
        }
        else if(currentString.length==0){
            console.log("Enter a number first :");
        }
        else{
            input.innerHTML+=e.target.innerHTML;
        }
    });
}

//onclick of equal button 
result.addEventListener("click",function(){
    // this is the string that we will be processing eg. -10+26+33-56*34/23
    var inputString=input.innerHTML;
    //forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
    var numbers = inputString.split(/\+|\-|\*|\//g);

    var operator=inputString.replace(/[0-9]|\./g, "").split("");

    console.log(inputString);
    console.log(operator);
    console.log(numbers);
    console.log("------------------------");    
    var divide = operator.indexOf("/");
    while (divide != -1) {
        console.log(divide);
        console.log(numbers[divide]);
        console.log(numbers[divide+1]);
      numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
      console.log(numbers);
      operator.splice(divide, 1);
        console.log(operator);
      divide = operator.indexOf("/");
      console.log(divide);
    }
  
    var multiply = operator.indexOf("*");
    while (multiply != -1) {
      numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
      operator.splice(multiply, 1);
      multiply = operator.indexOf("*");
    }
  
    var subtract = operator.indexOf("-");
    while (subtract != -1) {
      numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
      operator.splice(subtract, 1);
      subtract = operator.indexOf("-");
    }
  
    var add = operator.indexOf("+");
    while (add != -1) {
      // using parseFloat is necessary, otherwise it will result in string concatenation :)
      numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
      operator.splice(add, 1);
      add = operator.indexOf("+");
    }
  
    input.innerHTML = numbers[0]; // displaying the output
  
    resultDisplayed = true; // turning flag if result is displayed
});
 // clearing the input on press of clear
 clear.addEventListener("click", function() {
    input.innerHTML = "";
  });
