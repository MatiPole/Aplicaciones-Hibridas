const suma = (num1, num2) => {
  return num1 + num2;
};

const division = (num1, num2) => {
  return num1 / num2;
};

const maxValueArray = (array) => {
  return Math.max(...array);
};

console.log("Suma = ", suma(5, 10));

console.log("División = ", division(20, 2));

console.log("División 2 = ", division(20, 0));

console.log("Mayor número del array = ", maxValueArray([2, 8, 9, 7, 5, 6]));
