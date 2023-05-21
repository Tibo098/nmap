import express from "express"
import mongoose from "mongoose"
import route from "./route.js"

const app = express()
const port = 3000

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json())

// Middleware pour gérer les routes
app.use("/api", route)

// Connexion à la base de données MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/student", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connecté à la base de données MongoDB")
        // Démarrage du serveur
        app.listen(port, () => {
            console.log(`Serveur démarré sur le port ${port}`)
        })
    })
    .catch((error) => {
        console.error("Erreur lors de la connexion à la base de données:", error)
    })