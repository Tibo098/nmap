import React, { useState, useEffect } from "react"
import axios from "axios"
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
function Historique() {
    const [requetes, setRequetes] = useState([])

    useEffect(() => {
        fetchRequetes()
    }, [])

    const fetchRequetes = async () => {
        try {
            const response = await axios.get("http://localhost:3001/requests")
            setRequetes(response.data)
        } catch (error) {
            console.error("Erreur lors de la récupération des requêtes:", error)
        }
    }

    return (
        <div>
            <Menu />
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Historique des requêtes</h2>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Cible</th>
                            <th className="border px-4 py-2">Option de scan</th>
                            <th className="border px-4 py-2">Max-retries</th>
                            <th className="border px-4 py-2">Host-timeout</th>
                            <th className="border px-4 py-2">Port</th>
                            <th className="border px-4 py-2">Date</th> {/* Ajout de la colonne Date */}
                            <th className="border px-4 py-2">Résultat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requetes.map((requete) => (
                            <tr key={requete.numero}>
                                <td className="border px-4 py-2">{requete.cible}</td>
                                <td className="border px-4 py-2">{requete.option}</td>
                                <td className="border px-4 py-2">{requete.rest}</td>
                                <td className="border px-4 py-2">{requete.host}</td>
                                <td className="border px-4 py-2">{requete.port}</td>
                                <td className="border px-4 py-2">{new Date(requete.date).toLocaleString()}</td> {/* Affichage de la date */}
                                <td className="border px-4 py-2">{requete.resul}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Historique // Export par défaut du composant Historique
