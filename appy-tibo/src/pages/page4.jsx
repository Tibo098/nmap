import React, { useState } from "react"
import Link from "next/link"


function Menu() {
    return (
        <div className="flex items-center bg-blue-500 py-4">
            <h1 className="text-5xl font-bold text-gray-100 ml-10">
                <Link href="/">Nmap</Link>
            </h1>
            <ul className="flex text-lg flex-grow justify-center">
                <li className="p-4 hover:text-blue-200">
                    <Link href="/page2">Requetes</Link>
                </li>
                <li className="p-4 hover:text-blue-200">
                    <Link href="/page3">Mon Historique</Link>
                </li>
                <li className="p-4 hover:text-blue-200">
                    <Link href="/page4">Mes Résultats</Link>
                </li>
            </ul>
        </div>
    )
}


function MesRequetes() {
    const [numeroRequete, setNumeroRequete] = useState("")
    const [resultat, setResultat] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        // Effectuer une requête pour récupérer le résultat correspondant au numéro de requête
        // Remplacez cette partie avec votre logique pour récupérer le résultat depuis votre backend ou votre base de données

        // Exemple de code fictif pour simuler une requête et obtenir un résultat
        // Remplacez cette partie avec votre code réel
        const requeteResultat = {
            numero: numeroRequete,
            resultat: "Le résultat de la requête " + numeroRequete,
        }

        // Mettre à jour le résultat
        setResultat(requeteResultat.resultat)
    }

    return (
        <div>
            <Menu />
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Mes Requêtes</h2>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="flex items-center">
                        <label htmlFor="numeroRequete" className="mr-2">
              Numéro de Requête:
                        </label>
                        <input
                            type="text"
                            id="numeroRequete"
                            value={numeroRequete}
                            onChange={(e) => setNumeroRequete(e.target.value)}
                            className="border p-2"
                            required
                        />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 ml-2">
              Afficher le Résultat
                        </button>
                    </div>
                </form>
                {resultat && <p>Résultat de la Requête {numeroRequete}: {resultat}</p>}
                <p>
                    <Link href="/historique">Voir l'historique des requêtes</Link>
                </p>
            </div>
        </div>
    )
}

export default MesRequetes
