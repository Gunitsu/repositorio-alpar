// Funções JavaScript
// Implemente suas funções aqui

// Implementação da função Push
function push(array, ...items) {
    for (let item of items) {
      array[array.length] = item;
    }
    return array;
  }
  
  // Implementação da função Pop
  function pop(array) {
    if (array.length === 0) return undefined;
    const removedItem = array[array.length - 1];
    array.length -= 1;
    return removedItem;
  }
  
  // Implementação da função Shift
  function shift(array) {
    if (array.length === 0) return undefined;
    const removedItem = array[0];
    for (let i = 0; i < array.length - 1; i++) {
      array[i] = array[i + 1];
    }
    array.length -= 1;
    return removedItem;
  }
  
  // Implementação da função Unshift
  function unshift(array, ...items) {
    const originalLength = array.length;
    for (let i = array.length + items.length - 1; i >= items.length; i--) {
      array[i] = array[i - items.length];
    }
    for (let i = 0; i < items.length; i++) {
      array[i] = items[i];
    }
    return array;
  }
  
  // Implementação da função Slice
  function slice(array, indexStart, indexEnd) {
    const newArray = [];
    const start = indexStart || 0;
    const end = indexEnd || array.length;
    for (let i = start; i < end; i++) {
      newArray.push(array[i]);
    }
    return newArray;
  }
  
  // Implementação da função Splice
  function splice(array, indexStart, deleteCount, ...itemsToAdd) {
    const removedItems = [];
    const start = indexStart < 0 ? Math.max(array.length + indexStart, 0) : Math.min(indexStart, array.length);
    const count = Math.min(Math.max(deleteCount, 0), array.length - start);
  
    for (let i = start; i < start + count; i++) {
      removedItems.push(array[i]);
    }
  
    const itemsToAddCount = itemsToAdd.length;
    const newLength = array.length - count + itemsToAddCount;
  
    for (let i = array.length - 1; i >= start + count; i--) {
      array[i + itemsToAddCount] = array[i];
    }
  
    for (let i = 0; i < itemsToAddCount; i++) {
      array[start + i] = itemsToAdd[i];
    }
  
    array.length = newLength;
    return removedItems;
  }
  
  // Implementação da função ForEach
  function forEach(array, callback) {
    for (let i = 0; i < array.length; i++) {
      callback(array[i]);
    }
  }
  
  // Implementação da função Map
  function map(array, callback) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray[i] = callback(array[i]);
    }
    return newArray;
  }
  
  // Implementação da função Filter
  function filter(array, callback) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
      if (callback(array[i])) {
        newArray.push(array[i]);
      }
    }
    return newArray;
  }
  
  // Implementação da função Reduce
  function reduce(array, callback, initialAcumulatorValue) {
    let accumulator = initialAcumulatorValue !== undefined ? initialAcumulatorValue : array[0];
    const start = initialAcumulatorValue !== undefined ? 0 : 1;
    for (let i = start; i < array.length; i++) {
      accumulator = callback(accumulator, array[i]);
    }
    return accumulator;
  }
  
  // Funções de execução
  function execPush() {
    const arrayInput = document.getElementById("arrayInput").value.split(",");
    const params = document.getElementById("paramPush").value.split(",");
    const result = push(arrayInput, ...params);
    document.getElementById("resultPush").innerText = result.join(", ");
  }
  
  function execPop() {
    const arrayInput = document.getElementById("arrayInput").value.split(",");
    const result = pop(arrayInput);
    document.getElementById("resultPop").innerText = result;
  }
  
  function execShift() {
    const arrayInput = document.getElementById("arrayInput").value.split(",");
    const result = shift(arrayInput);
    document.getElementById("resultShift").innerText = result;
  }
  
  function execUnshift() {
    const arrayInput = document.getElementById("arrayInput").value.split(",");
    const params = document.getElementById("paramPush").value.split(",");
    const result = unshift(arrayInput, ...params);
    document.getElementById("resultUnshift").innerText = result.join(", ");
  }
  
  function execSlice() {
    const arrayInput = document.getElementById("arrayInput").value.split(",");
    const start = document.getElementById("paramSliceStart").value;
    const end = document.getElementById("paramSliceEnd").value;
    const result = slice(arrayInput, start, end);
    document.getElementById("resultSlice").innerText = result.join(", ");
  }
  
  function execSplice() {
    const arrayInput = document.getElementById("arrayInput").value.split(",");
    const start = document.getElementById("paramSpliceStart").value;
    const deleteCount = document.getElementById("paramSpliceDeleteCount").value;
    const itemsToAdd = document.getElementById("paramSpliceItemsToAdd").value.split(",");
    const result = splice(arrayInput, start, deleteCount, ...itemsToAdd);
    document.getElementById("resultSplice").innerText = "Itens Removidos: " + result.join(", ") + "\nNovo Array: " + arrayInput.join(", ");
  }
  
  function execForEach() {
    const arrayInput = document.getElementById("arrayInput").value.split(",");
    const param = document.getElementById("paramForEachCallback").value;
    const result = [];
    forEach(arrayInput, (item) => result.push(item + param));
    document.getElementById("resultForEach").innerText = result.join(", ");
  }
  
  function execMap() {
    const arrayInput = document.getElementById("arrayInput").value.split(",");
    const param = document.getElementById("paramMapCallback").value;
    const result = map(arrayInput, (item) => item + param);
    document.getElementById("resultMap").innerText = result.join(", ");
  }
  
  function execFilter() {
    const arrayInput = document.getElementById("arrayInput").value.split(",");
    const param = document.getElementById("paramFilterCallback").value;
    const result = filter(arrayInput, (item) => item.includes(param));
    document.getElementById("resultFilter").innerText = result.join(", ");
  }
  
  function execReduce() {
    const arrayInput = document.getElementById("arrayInput").value.split(",");
    const initialValue = document.getElementById("paramReduceInitial").value;
    const result = reduce(arrayInput, (acc, item) => parseInt(acc) + parseInt(item), initialValue);
    document.getElementById("resultReduce").innerText = result;
  }