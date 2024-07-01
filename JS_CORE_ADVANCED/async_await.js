/**
 *? Напишите функцию, которая сначала загружает данные с одного сервера, а затем  использует эти данные для
 *? выполнения запроса к другому серверу. Используйте async/await для обеспечения последовательного выполнения запросов.
 */
async function ayncFunc() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((resp) => resp.json())
    .catch((err) => {
      throw new Error(err);
    })
    .then((data) => {
      console.log(data);
      return data;
    });
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: "copy",
      userId: res.userId,
      body: res.title,
      completed: true,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data));
}
ayncFunc();
