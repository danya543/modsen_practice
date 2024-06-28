/**
 *? Напишите функцию, которая принимает массив и значение, и возвращает true,
 *? если это значение присутствует в массиве, и false, если нет. Используйте строгий режим
 */

"use strict";

function arrIncludeVal(arr, val) {
  return arr.includes(val);
}
console.log(arrIncludeVal([1, 2, 3, 4, 5, 6, 7], 756));
