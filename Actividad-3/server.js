import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));

//Parte 1

app.get("/", (req, res) => {
  res.send("<h1>Matías Poletto</h1>");
});

app.get("/materia", (req, res) => {
  res.send("<h1>Aplicaciones Híbridas</h1>");
});

app.get("/profesor", (req, res) => {
  res.send("<h1>Camila Marcos</h1>");
});

//Parte 2

const tecnologias = ["PHP", "CSS", "Javascript", "Node.js", "Laravel"];

app.get("/stack/:tecnologia", (req, res) => {
  const tecnologia = req.params.tecnologia;

  if (tecnologias.includes(tecnologia)) {
    res.send(`donde te dejo el CV?`);
  } else {
    res.send(`a leer la documentacion entonces..`);
  }
});

app.get("/stack/:tecnologia", (req, res) => {
  const tecnologia = req.params.tecnologia;

  if (tecnologias.includes(tecnologia)) {
    res.send(`donde te dejo el CV?`);
  } else {
    res.send(`a leer la documentacion entonces...`);
  }
});

//Parte 3
const productos = [
  { id: 1, nombre: "Alfajor Milka", precio: 500 },
  { id: 2, nombre: "Bon o bon", precio: 150 },
  { id: 3, nombre: "Nachos Doritos", precio: 500 },
  { id: 4, nombre: "Bebida Monster", precio: 800 },
  { id: 5, nombre: "Bananita Dolca", precio: 250 },
  { id: 6, nombre: "Chocolate Biznike", precio: 340 },
  { id: 7, nombre: "9 de oro", precio: 400 },
  { id: 8, nombre: "Galletitas Ópera", precio: 350 },
  { id: 9, nombre: "Galletitas Oreo Mini", precio: 300 },
  { id: 10, nombre: "Saladix", precio: 280 },
];

app.get("/productos/:id", (req, res) => {
  const idProducto = parseInt(req.params.id);

  const producto = productos.find((p) => p.id === idProducto);

  if (producto) {
    res.send({ producto });
  } else {
    return res.status(404).send({ error: "producto no encontrado" });
  }
});

app.get("/productos", (req, res) => {
  const minimo = req.query.minimo;
  const maximo = req.query.maximo;

  let productosFiltrados = [...productos];

  if (minimo) {
    productosFiltrados = productosFiltrados.filter(
      (producto) => producto.precio >= minimo
    );
  }

  if (maximo) {
    productosFiltrados = productosFiltrados.filter(
      (producto) => producto.precio <= maximo
    );
  }

  res.send({ productosFiltrados });
});

app.use((req, res) => {
  res.status(404).send("<h1>404 not found!</h1>");
});

app.listen(3000, () =>
  console.log("server running on port 3000... \nopen in http://localhost:3000")
);
