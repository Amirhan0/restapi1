const express = require("express");
const app = express();
const cors = require("cors");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Base = require("./models/bases");
const BaseRouter = require("./routes/base-routes");
const port = process.env.PORT || 4000;
const db =
  "mongodb+srv://Amir:narhanim123@cluster0.u7lmi2z.mongodb.net/restApiBase?retryWrites=true&w=majority&appName=Cluster0";

// Подключение к базе данных
mongoose
  .connect(db)
  .then(() => console.log("DB Connect"))
  .catch((error) => console.log(error));

// Настройка CORS
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "https://amirhan0.github.io"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Отправлять данные в виде JSON
app.use(express.json());
app.use(BaseRouter);
app.use(methodOverride("_method"));

// GET запрос
app.get("/api/items", async (req, res) => {
  try {
    const items = await Base.find();
    res.json(items);
  } catch (error) {
    console.error("Ошибка: ", error); // Вывод ошибки в консоль
    res.status(500).send("Server error"); // Отправка ответа с кодом ошибки
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server hosting on 4000 PORT`);
});
