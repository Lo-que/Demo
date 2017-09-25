function isOperator(value) {
    var operatorString = "+-*/()";
    return operatorString.indexOf(value) > -1
}

function getPrioraty(value) {
    switch (value) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        default:
            return 0;
    }
}

function prioraty(o1, o2) {
    return getPrioraty(o1) <= getPrioraty(o2);
}

function dal2Rpn(exp) {
    var inputStack = [];
    var outputStack = [];
    var outputQueue = [];

    for (var i = 0, len = exp.length; i < len; i++) {
        var cur = exp[i];
        if (cur != ' ') {
            inputStack.push(cur);
        }
    }
    console.log('step one');
    while (inputStack.length > 0) {
        var cur = inputStack.shift();
        if (isOperator(cur)) {
            if (cur == '(') {
                outputStack.push(cur);
            } else if (cur == ')') {
                var po = outputStack.pop();
                while (po != '(' && outputStack.length > 0) {
                    outputQueue.push(po);
                    po = outputStack.pop();
                }
                if (po != '(') {
                    throw "error: unmatched ()";
                }
            } else {
                while (prioraty(cur, outputStack[outputStack.length - 1]) && outputStack.length > 0) {
                    outputQueue.push(outputStack.pop());
                }
                outputStack.push(cur);
            }
        } else {
            outputQueue.push(new Number(cur));
        }
    }
    console.log('step two');
    if (outputStack.length > 0) {
        if (outputStack[outputStack.length - 1] == ')' || outputStack[outputStack.length - 1] == '(') {
            throw "error: unmatched ()";
        }
        while (outputStack.length > 0) {
            outputQueue.push(outputStack.pop());
        }
    }
    console.log('step three');
    return outputQueue;
}
// console.log(dal2Rpn('1 + 2'));
// console.log(dal2Rpn('1 + 2 + 3'));
// console.log(dal2Rpn('1 + 2 * 3'));
// console.log(dal2Rpn('1 + 2 * 3 - 4 / 5'));
// console.log(dal2Rpn('( 1 + 2 )'));

// console.log(dal2Rpn('( 1 + 2 ) * ( 3 - 4 ) / 5'));
// console.log(dal2Rpn('( 1 + 2 ) * (( 3 - 4 ) / 5)'));


// function evalRpn(rpnQueue) {
//     var outputStack = [];
//     while (rpnQueue.length > 0) {
//         var cur = rpnQueue.shift();

//         if (!isOperator(cur)) {
//             outputStack.push(cur);
//         } else {
//             if (outputStack.length < 2) {
//                 throw "unvalid stack length";
//             }
//             var sec = outputStack.pop();
//             var fir = outputStack.pop();

//             outputStack.push(getResult(fir, sec, cur));
//         }
//     }

//     if (outputStack.length != 1) {
//         throw "unvalid expression";
//     } else {
//         return outputStack[0];
//     }
// }

// function toRPolish(input){
//     var regex = /(\(|\)|\+|\-|\*|\/)+/;
//     var array = input.split(regex);
//     var RPolish = ""
//     var isI = false;
//     num = 0;
//     var SymbolArray = new Array(100);
//     var SymbolNum = -1;
//     for(j = 0;j < input.length;j++){
//         if(input.charAt(j).match(/\d/)){
//             if(isI == false){
//                 RPolish += ','
//                 RPolish += array[num];
//                 num++;
//                 isI = true;
//             }
//         }
//         else{
//             if(SymbolNum == -1){
//                     SymbolNum++;
//                     SymbolArray[SymbolNum] = input.charAt(j);
//             }else{
//                 if(input.charAt(j).match(/\(/)  || SymbolArray[SymbolNum].match(/\(/)){
//                         SymbolNum++;
//                         SymbolArray[SymbolNum] = input.charAt(j);
//                 }else if(input.charAt(j).match(/\)/)){
//                     while(!SymbolArray[SymbolNum].match(/\(/)){
//                         RPolish += ',';
//                         RPolish += SymbolArray[SymbolNum];
//                         SymbolNum--;
//                     }
//                     SymbolNum--;
//                 }else if(compare(input.charAt(j),SymbolArray[SymbolNum])){
//                         SymbolNum++;
//                         SymbolArray[SymbolNum] = input.charAt(j);
//                 }else if(!compare(input.charAt(j),SymbolArray[SymbolNum])){
//                         RPolish += ',';
//                         RPolish += SymbolArray[SymbolNum];
//                         SymbolNum--;
//                         if(SymbolNum >= 0){
//                             if(SymbolArray[SymbolNum].match(/\(/)){
//                                 SymbolNum++;
//                                 SymbolArray[SymbolNum] = input.charAt(j);
//                             }else if(!compare(input.charAt(j),SymbolArray[SymbolNum])){
//                                 RPolish += ',';
//                                 RPolish += SymbolArray[SymbolNum];
//                                 SymbolArray[SymbolNum] = input.charAt(j);
//                             }else{
//                                 SymbolNum++;
//                                 SymbolArray[SymbolNum] = input.charAt(j);
//                             }
//                         }else{
//                             SymbolNum++;
//                             SymbolArray[SymbolNum] = input.charAt(j);
//                         }
//                 }
//             }
//             isI = false;
//         }
//     }
//     while(SymbolNum >=0){
//         RPolish += ',';
//         RPolish += SymbolArray[SymbolNum];
//         SymbolNum--;
//     }
//     regex =  /,/;
//     var RPolishArray = RPolish.split(regex);
//     return RPolishArray;
// }

// function compare(a,b){
//     if((a.match(/\*/)||a.match(/\//))&&(b.match(/\+/)||b.match(/\-/))){
//         return true;
//     }else{
//         return false;
//     }
// }






// function calculate(RPolishArray){
//     var result = 0;
//     var tempArray = new Array(100);
//     var tempNum = -1;
//     for(i = 0;i < RPolishArray.length;i++){

//         if(RPolishArray[i].match(/\d/)){
//             tempNum++;
//             tempArray[tempNum] = RPolishArray[i];
//         }else{
//             switch(RPolishArray[i]){
//                 case '+':
//                     result = (tempArray[tempNum-1] *1) + (tempArray[tempNum] * 1);
//                     tempNum--;
//                     tempArray[tempNum] = result;
//                     break;
//                 case '-':
//                     result = (tempArray[tempNum-1] *1) - (tempArray[tempNum] * 1);
//                     tempNum--;
//                     tempArray[tempNum] = result;
//                     break;
//                 case '*':
//                     result = (tempArray[tempNum-1] *1) * (tempArray[tempNum] * 1);
//                     tempNum--;
//                     tempArray[tempNum] = result;
//                     break;
//                 case '/':
//                     result = (tempArray[tempNum-1] *1) / (tempArray[tempNum] * 1);
//                     tempNum--;
//                     tempArray[tempNum] = result;
//                     break;
//             }
//         }
//     }
//     result = tempArray[tempNum];
//     return result;
// }






function Stack(){
    this.store = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
}

function push(ele){
    this.store[this.top++] = ele;
}

function pop(){
    var top = --this.top;
    if(top >= 0){
        var val =  this.store[top];
//-----------------务必删除弹出栈的值原来的空间----------------------------
        this.store.splice(this.top,1);
        return val;
    }else{
        return 'It\' Ending !';
    }


}
//----------------中缀表达式转后缀表达式-----------------------------------
function normalChar(normalC){
    normalC = normalC.split(' ');
    var arr = [];
    var ls = new Stack();
    var reg = /\d/;

    for(var i=0; i<normalC.length; i++){
        if(reg.test(normalC[i])){
            arr.push(normalC[i]);

        }
        if(normalC[i] == '('){
            ls.push(normalC[i]);
        }
        else if(normalC[i] == ')'){
            while(ls.store[ls.top-1] != '('){
                arr.push(ls.pop());
            }
            ls.pop();
        }
//-----------------此处是在添加数字的时候进行的，不会和其他操作符发生冲突--
        else if(ls.store[ls.top-1] == '*' || ls.store[ls.top-1] =='/'){
            arr.push(ls.pop());
        }

        else if(normalC[i] == '*' || normalC[i] =='/'){
            ls.push(normalC[i]);

        }
        else if(normalC[i] == '+' || normalC[i] =='-'){
            if(ls.top == 0){
                ls.push(normalC[i]);
            }
            else if(ls.top > 0){
                if(ls.store[ls.top-1] == '('){
                    ls.push(normalC[i]);
                }else{
                    arr.push(ls.pop());
                    ls.push(normalC[i]);
                }
            }

        }


    }
    while(ls.store != 0){
        arr.push(ls.pop());
    }
    return arr;
    console.log(arr);
}

//------------------------Testing---------------------------------------
function calculate(input){
    //输入时做提示，以空格间隔每个操作符和操作数
//var normalC = ' 1 - ( 2 + 3 ) * 4 * 2 + 10 / 5 ';
//var normalC = '2 + 3 * 4 * ( 3 - 2 )';
var stack = new Stack();
var char = normalChar(input);
var p = 0,s = 0;
var reg = /\d/;
for(var i=0; i<char.length; i++){
    if(reg.test(char[i])){
        stack.push(char[i]);
    }else{
        switch(char[i]){
            case '-':
                p = stack.pop();
                s = stack.pop();
                stack.push(Number(s)-Number(p));
                break;
            case '+':
                p = stack.pop();
                s = stack.pop();
                stack.push(Number(s)+Number(p));
                break;
            case '*':
                p = stack.pop();
                s = stack.pop();
                stack.push(Number(s)*Number(p));
                break;
            case '/':
                p = stack.pop();
                s = stack.pop();
                if(p != 0){
                    stack.push(Number(s)/Number(p));
                }else{
                    console.log("除数不能为0");
                    break;
                }
        }
    }
}
console.log(stack.store);
}






















