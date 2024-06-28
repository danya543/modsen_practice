/**
 *? Напишите функцию, которая принимает массив с числами и находит сумму первой
 *? половины элементов этого массива.
 */
function firstHalfSum(arr) {
  return arr.slice(0, Math.ceil(arr.length / 2)).reduce((acc, el) => (acc += el), 0);
}
console.log(firstHalfSum([1, 2, 3, 4, 5]));
