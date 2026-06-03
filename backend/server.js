const path = require("path");
const fs = require("fs");

const envPath = path.resolve(__dirname, "../.env");
const envExists = fs.existsSync(envPath);

if (!envExists) {
    console.error(`No se encontró el archivo .env en: ${envPath}`);
} else {
    const result = require("dotenv").config({ path: envPath });
    if (result.error) {
        console.error("Error cargando .env:", result.error);
    } else {
        console.log(".env cargado desde:", envPath);
    }
}

console.log("HOST:", process.env.DB_HOST);
console.log("USER:", process.env.DB_USER);
console.log("DB:", process.env.DB_NAME);

require("./src/config/db");

const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
