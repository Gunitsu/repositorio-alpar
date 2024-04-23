//FUNÇÃO PUSH 

const meuArrayEl = document.getElementById("arrayDisplay")
let array = [];

function push(array, ...items) {
    for (let item of items) {
        array[array.length] = item;
    }
    return array.length;
}

function IncluiPush() {

    let meuValor = document.getElementById("meuInput").value;
    
    array.push(meuValor.trim());
    
    if(meuValor)
    {
        if(!meuArrayEl.innerText)
        {
            meuArrayEl.innerText = array.join(" ");
        }else{
            meuArrayEl.innerText = array.join(", ");
        }
        document.getElementById("meuInput").value = "";

    }else{

    }

}

//FUNÇÃO POP

function pop(array) {
    if (array.length === 0) {
        return undefined;
    }
    return array.pop();
}

function execPop() {

    let removedItem = pop(array);

    if (meuArrayEl.innerText) {

        meuArrayEl.innerText = array; 
        alert("Item removido: " + removedItem); 

    } else {

        alert("O array está vazio!");
    }
}

//FUNÇÃO SHIFT

function shift(array) {
    if (array.length === 0) {
        return undefined;
    }
    return array.shift();
}

function execShift() {

    let removedItem = shift(array);

    if (meuArrayEl.innerText) {

        meuArrayEl.innerText = array; 
        alert("Item removido: " + removedItem); 

    } else {

        alert("O array está vazio!");
    }
}

//FUNÇÃO UNSHIFT

function unshift(array, ...items) {
    for (let i = items.length - 1; i >= 0; i--) {

        array.unshift(items[i]);
    }
    return array.length;
}

function execUnShift() {

    if(meuArrayEl.innerText)
    {
        let inputValue = document.getElementById("inputUnshift").value; 

        unshift(array, inputValue.trim());
    
        meuArrayEl.innerText = array
        document.getElementById("inputUnshift").value = "";
    } else {

        alert("O array está vazio!"); 
        document.getElementById("inputUnshift").value = "";
    }

}

//FUNÇÃO SLICE

function slice(array, start, end) {
    return array.slice(start, end);
}


function execSlice() {

    let startValue = parseInt(document.getElementById("initSlice").value);
    let endValue = parseInt(document.getElementById("endSlice").value); 

    let subarray = slice(array, startValue, endValue); 
    document.getElementById("subarrayDisplay").innerText = subarray; 
}

//FUNÇÃO SPLICE

function splice(array, start, deleteCount, ...items) {
    array.splice(start, deleteCount, ...items);
    return array;
}

function execSplice() {


    if(meuArrayEl.innerText)
    {

        let inicioSplice = parseInt(document.getElementById("initSplice").value);
        let quantidadeSplice = parseInt(document.getElementById("qntSplice").value);
        
        let novosItens = document.getElementById("newSplice").value.split(",");
    
        let newArray = splice(array, inicioSplice, quantidadeSplice, ...novosItens); 
        document.getElementById("subarrayDisplay2").innerText = newArray;

    } else {

        alert("O array está vazio!"); 
        document.getElementById("inputUnshift").value = "";
    }


}

//FUNÇÃO FOREACH

function forEach(array, callback, value) {
    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array, value);
    }
}

function addValueToElement(element, index, array, value) {
    array[index] = element + value;
}

function forEachArray() {

    if(meuArrayEl.innerText)
    {
        let value = document.getElementById("novoElemento").value;

        forEach(array, addValueToElement, value); 
    
        document.getElementById("arrayForEach").innerText = array;
        document.getElementById("novoElemento").value = "";

    } else {

        alert("O array está vazio!"); 
        document.getElementById("inputUnshift").value = "";
    }

}

//FUNÇÃO MAP

function map(array, callback, value) {

    return array.map(function(element) {
        return callback(element, value);
    });
}

function addValueToElement(element, value) {
    return element + value; 
}

function execMap() {

    if(meuArrayEl.innerText)
    {
        let value = document.getElementById("mapInput").value;
    
        let newArray = map(array, addValueToElement, parseInt(value));
        
        document.getElementById("arrayMap").innerText = newArray; 
        document.getElementById("mapInput").value = ""; 

    } else {

        alert("O array está vazio!"); 
        document.getElementById("inputUnshift").value = "";
    }
    
}

//FUNÇÃO FILTER

function filter(array, callback, value) {
    return array.filter(function(element) {
        return callback(element, value);
    });
}

function filterElement(element, value) {
    return element > parseInt(value);
}

function execFilter() {

    if(meuArrayEl.innerText)
    {

        let value = document.getElementById("filterInput").value; 
    
        let filteredArray = filter(array, filterElement, value); 
        
        document.getElementById("arrayFilter").innerText = filteredArray;

    } else {

        alert("O array está vazio!"); 
        document.getElementById("inputUnshift").value = "";
    }


}

//FUNÇÃO REDUCE

function reduce(array, callback, initialValue) {
    return array.reduce(function(accumulator, currentValue) {
        return callback(accumulator, currentValue); 
    }, initialValue);
}

function sumValues(accumulator, currentValue) {
    return accumulator + currentValue; 
}

function execReduce() {

    if(meuArrayEl.innerText)
    {
        
        let value = document.getElementById("reduceInput").value; 
    
        let initialValue = parseInt(value) || 0;
        
        let reducedValue = reduce(array.map(Number), sumValues, initialValue); 
        
        document.getElementById("arrayReduce").innerText = reducedValue; 

    } else {

        alert("O array está vazio!"); 
        document.getElementById("inputUnshift").value = "";
    }
    

}
