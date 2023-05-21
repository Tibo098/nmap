import express from "express"
import cors from "cors"
import basyx from "./model.js"
import { exec } from "child_process"

const router = express.Router()

// Configuration CORS
const corsOptions = {
    origin: "http://localhost:3000", // Remplacez par l'URL de votre frontend
}

router.use(cors(corsOptions))


// Fonction pour exécuter la commande Nmap
const executeNmapCommand = (cible, option, rest, host, port) => {
    // Construisez la commande Nmap avec les options sélectionnées
    const command = `nmap -p ${port} --host-timeout ${host} ${cible}`

    // Exécutez la commande
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur lors de l'exécution de la commande : ${error.message}`)

            
            return
        }

        if (stderr) {
            console.error(`Erreur de la commande : ${stderr}`)

            
            return
        }

        // Stockez le résultat de la commande dans la base de données
        const newRequest = new basyx({
            cible,
            option,
            rest,
            host,
            port,
            resul: stdout,
        })

        newRequest.save()
            .then(savedRequest => {
                console.log("Requête enregistrée :", savedRequest)
            })
            .catch(error => {
                console.error("Erreur lors de l'enregistrement de la requête :", error)
            })
    })
}

// Route pour créer une nouvelle requête
router.post("/requests", (req, res) => {
    try {
        const { cible, option, rest, host, port } = req.body

        // Exécutez la commande Nmap et stockez le résultat dans la base de données
        executeNmapCommand(cible, option, rest, host, port)

        res.status(201).json({ message: "La requête a été exécutée avec succès." })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Une erreur s'est produite lors de la création de la requête." })
    }
})

// Route pour récupérer toutes les requêtes
router.get("/requests", async (req, res) => {
    try {
        const requests = await basyx.find()
        res.json(requests)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des requêtes." })
    }
})

export default router
