import("./module.mjs").then(({ multiplicarTabla }) => {
  console.log(multiplicarTabla(3));
});

function parImpar(num) {
  if (num % 2 === 0) {
    console.log("El número es par");
  } else {
    console.log("El número es impar");
  }
}

module.exports = { parImpar };
