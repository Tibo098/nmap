import express from "express"
import mongoose from "mongoose"
import route from "./route.js"
import cors from "cors"

// Créer une instance de l'application Express
const app = express()

// Middleware pour autoriser les requêtes CORS
app.use(cors())

// Middleware pour parser le corps des requêtes au format JSON
app.use(express.json())

// Connexion à la base de données MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/apyx", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connecté à la base de données MongoDB")
    })
    .catch((error) => {
        console.error("Erreur de connexion à la base de données MongoDB", error)
    })

// Utilisation des routes
app.use(route)

// Démarrer le serveur
app.listen(3001, () => {
    console.log("Serveur démarré sur le port 3001")
})
