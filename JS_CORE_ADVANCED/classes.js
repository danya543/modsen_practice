/**
 *? Создайте класс под названием «Прямоугольник» со свойствами ширины и высоты. Включите два метода расчета
 *? площади и периметра прямоугольника. Создайте экземпляр класса «Прямоугольник» и вычислите его площадь и периметр.
 */
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  rectArea() {
    return this.width * this.height;
  }
  rectPerimeter() {
    return (this.width + this.height) * 2;
  }
}

const rect = new Rectangle(3, 5);
console.log(rect.rectPerimeter());
console.log(rect.rectArea());
