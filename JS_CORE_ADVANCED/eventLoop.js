/**
 *? Напишите функцию, которая извлекает данные из API и отменяет
 *? запрос, если он занимает больше указанного времени.
 */
async function fetchControl() {
  let controller = new AbortController();
  setTimeout(() => controller.abort(), 100);

  try {
    await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      signal: controller.signal,
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  } catch (err) {
    if (err.name == "AbortError") {
      console.log("Request canceled");
    } else {
      throw err;
    }
  }
}
fetchControl();
