/**
 *? Напишите функцию, которая использует блок try-catch для перехвата и обработки ошибки
 *? TypeError при доступе к свойству неопределенного объекта.
 */
function handler() {
  const obj = undefined;
  try {
    return obj.prop;
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
}
handler();
