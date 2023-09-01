const path = require("path");
const fs = require("fs");
const os = require("os");

const notasPath = path.join(__dirname, "archivos", "notas.txt");
const infoPath = path.join(__dirname, "archivos", "info.txt");

const contenidoNotas = fs.readFileSync(notasPath, "utf-8");
console.log(`Contenido de notas.txt: \n${contenidoNotas}`);

fs.writeFile(
  infoPath,
  `El sistema operativo es ${os.platform + " Y la arquitectura: " + os.arch}`,
  (error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log("mensaje creado");
    }
  }
);

fs.writeFileSync(notasPath, "\nMatías, algún mensaje", { flag: "a" });

console.log(notasPath, infoPath);
