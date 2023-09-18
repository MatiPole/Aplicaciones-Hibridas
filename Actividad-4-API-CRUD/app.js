import express from "express";

const app = express();

const port = 2023;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
  {
    id: 1,
    nombre: "Matías",
    apellido: "Poletto",
    mail: "matias.poletto@davinci.edu.ar",
    edad: 27,
    cursos: ["Curso de React.js", "Curso de Laravel"],
  },
  {
    id: 2,
    nombre: "Tomás",
    apellido: "Cahue",
    mail: "tomas.cahue@davinci.edu.ar",
    edad: 27,
    cursos: ["Curso de Javascript", "Curso de Figma"],
  },
  {
    id: 3,
    nombre: "Alejandro",
    apellido: "Arroyo",
    mail: "alejandro.arroyo@davinci.edu.ar",
    edad: 27,
    cursos: ["Curso de Figma", "Curso de Laravel"],
  },
  {
    id: 4,
    nombre: "Valentín",
    apellido: "Etcheberry",
    mail: "valentin.etcheberry@davinci.edu.ar",
    edad: 27,
    cursos: ["Curso de React.js", "Curso de Javascript"],
  },
];

let cursos = [
  {
    id: 1,
    nombre: "Curso de React.js",
    docente: "Camila Marcos Galban",
  },
  {
    id: 2,
    nombre: "Curso de Laravel",
    docente: "Santiago Gallino",
  },
  {
    id: 3,
    nombre: "Curso de Javascript",
    docente: "Carlos Ferrer",
  },
  {
    id: 4,
    nombre: "Curso de Figma",
    docente: "Valeria Meijide",
  },
];

app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.get("/cursos", (req, res) => {
  res.json(cursos);
});

app.put("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updateUsuario = req.body;
  const index = usuarios.findIndex((value) => value.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  usuarios[index] = { id, ...updateUsuario };
  res.json(usuarios[index]);
});

app.put("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updateUsuario = req.body;
  const index = usuarios.findIndex((value) => value.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  usuarios[index] = { id, ...updateUsuario };
  res.json(usuarios[index]);
});

app.put("/cursos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updateCurso = req.body;
  const index = cursos.findIndex((value) => value.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Curso no encontrado" });
  }
  cursos[index] = { id, ...updateCurso };
  res.json(cursos[index]);
});
//MIDDLEWARE
const validacionUsuario = (req, res, next) => {
  const { nombre, apellido, mail, edad, cursos } = req.body;

  if (!nombre || !apellido || !mail || !edad || !cursos) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios." });
  }

  if (nombre.length > 20 || apellido.length > 20) {
    return res.status(400).json({
      error: "El nombre de usuario no puede tener más de 20 caracteres.",
    });
  }

  const caracteresEspeciales = /[%$#!*]/;
  if (
    caracteresEspeciales.test(nombre) ||
    caracteresEspeciales.test(apellido)
  ) {
    return res.status(400).json({
      error:
        "El nombre de usuario no puede contener caracteres especiales (%$#!*).",
    });
  }

  if (edad < 18) {
    return res
      .status(400)
      .json({ error: "El usuario debe tener al menos 18 años." });
  }

  if (cursos.length < 2) {
    return res.status(400).json({
      error: "El usuario debe estar inscrito en al menos dos cursos.",
    });
  }

  next();
};

app.post("/usuarios", validacionUsuario, (req, res) => {
  const newUsuario = req.body;
  usuarios.push(newUsuario);
  res.status(201).json(newUsuario);
});

app.post("/cursos", (req, res) => {
  const newCursos = req.body;
  cursos.push(newCursos);
  res.status(201).json(newCursos);
});

app.delete("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex((value) => value.id === id);
  if (index === -1) {
    return res.status(404).json("Usuario no encontrado");
  }
  const deletedUsuario = usuarios.splice(index, 1);
  res.json(deletedUsuario);
});

app.delete("/cursos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cursos.findIndex((value) => value.id === id);
  if (index === -1) {
    return res.status(404).json("Usuario no encontrado");
  }
  const deletedCurso = cursos.splice(index, 1);
  res.json(deletedCurso);
});

app.get("/cursos/:docente", (req, res) => {
  const docenteBuscado = req.params.docente;
  const cursosPorDocente = cursos.filter((value) =>
    value.docente.includes(docenteBuscado)
  );

  if (cursosPorDocente.length > 0) {
    res.json(cursosPorDocente);
  } else {
    res
      .status(404)
      .json({ error: "No se encontraron cursos con ese docente." });
  }
});

app.listen(port, () => {
  console.log("server is runing on http://localhost:" + port);
});
