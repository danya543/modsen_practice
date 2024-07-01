/**
 *? Напишите функцию, которая принимает массив URL-адресов и параллельно
 *? загружает содержимое каждого URL-адреса с помощью Promises
 */
function promiseUrls(urls) {
  Promise.all(
    urls.map((url) =>
      fetch(url)
        .then((response) => response.json())
        .then((data) => console.log(data))
    )
  );
}
promiseUrls([
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/3",
]);
