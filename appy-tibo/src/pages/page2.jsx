import React, { useState } from "react"
import Link from "next/link"
import axios from "axios"

function Menu() {
    return (
        <div className="items-center bg-blue-500 py-4 flex ">
            <h1 className="text-5xl font-bold text-gray-100 ml-10">
                <Link href="/">Nmap</Link>
            </h1>
            <ul className="text-lg flex-grow justify-center flex ">
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
function Requetes() {
    const [cible, setCible] = useState("")
    const [option, setOption] = useState("")
    const [maxRetries, setMaxRetries] = useState("")
    const [showMaxPort, setShowMaxPort] = useState(false)
    const [maxPort, setMaxPort] = useState("")
    const [host, setHost] = useState("")
    const [showPortNumber, setShowPortNumber] = useState(false)
    const [port, setPort] = useState("")
    const [customPortNumber, setCustomPortNumber] = useState("")

    const optionsList = ["-sS", "-sV"]
    const restList = ["--max-retries"]
    const hostList = ["--host-timeout"]

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.post("http://localhost:3001/requests", {
                cible,
                option,
                rest: showMaxPort ? maxPort : "",
                host,
                port: showPortNumber ? customPortNumber : "",
            })

            console.log(response.data)

            // Réinitialiser les champs du formulaire après la soumission réussie
            setCible("")
            setOption("")
            setMaxRetries("")
            setShowMaxPort(false)
            setMaxPort("")
            setHost("")
            setShowPortNumber(false)
            setCustomPortNumber("")
        } catch (error) {
            console.error(error)
            // Gérer l'erreur de soumission de la requête
        }
    }

    const handleRestChange = (e) => {
        const selectedRest = e.target.value
        setMaxRetries(selectedRest)

        // Vérifiez si la valeur sélectionnée nécessite l'affichage du champ MaxPort
        setShowMaxPort(selectedRest !== "")
    }

    const handlePortChange = (e) => {
        const selectedPort = e.target.value
        setPort(selectedPort)

        // Vérifiez si la valeur sélectionnée nécessite l'affichage du champ PortNumber
        setShowPortNumber(selectedPort === "custom")
    }

    const handleCustomPortChange = (e) => {
        setCustomPortNumber(e.target.value)
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-blue-500 rounded-lg p-8">
                <h2 className="text-2xl mb-4 text-white">Accueil</h2>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <div className="flex items-center mb-4">
                        <label htmlFor="ip" className="text-white mr-2">
              Cible:
                        </label>
                        <input
                            type="text"
                            id="ip"
                            name="ip"
                            className="bg-white rounded px-2 py-1"
                            value={cible}
                            onChange={(e) => setCible(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center mb-4">
                        <label htmlFor="opti" className="text-white mr-2">
              Options/scan :
                        </label>
                        <select
                            id="opti"
                            name="opti"
                            className="bg-white rounded px-2 py-1"
                            value={option}
                            onChange={(e) => setOption(e.target.value)}
                        >
                            <option value="">Sélectionner une option</option>
                            {optionsList.map((opt, index) => (
                                <option key={index} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center mb-4">
                        <label htmlFor="max" className="text-white mr-2">
              max-retries:
                        </label>
                        <select
                            type="text"
                            id="max"
                            name="max"
                            className="bg-white rounded px-2 py-1"
                            value={maxRetries}
                            onChange={handleRestChange}
                        >
                            <option value=""></option>
                            {restList.map((rest, index) => (
                                <option key={index} value={rest}>
                                    {rest}
                                </option>
                            ))}
                        </select>
                    </div>

                    {showMaxPort && (
                        <div className="mb-4">
                            <label htmlFor="MaxPort" className="text-white mr-2">
                Numéro de port :
                            </label>
                            <input
                                type="text"
                                id="MaxPort"
                                name="MaxPort"
                                className="bg-white rounded px-2 py-1"
                                value={maxPort}
                                onChange={(e) => setMaxPort(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="flex items-center mb-4">
                        <label htmlFor="host" className="text-white mr-2">
              host-timeout:
                        </label>
                        <select
                            type="text"
                            id="host"
                            name="host"
                            className="bg-white rounded px-2 py-1"
                            value={host}
                            onChange={(e) => setHost(e.target.value)}
                        >
                            <option value=""></option>
                            {hostList.map((host, index) => (
                                <option key={index} value={host}>
                                    {host}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center mb-4">
                        <label htmlFor="port" className="text-white mr-2">
              Port:
                        </label>
                        <select
                            type="text"
                            id="port"
                            name="port"
                            className="bg-white rounded px-2 py-1"
                            value={port}
                            onChange={handlePortChange}
                        >
                            <option value=""></option>
                            <option value="custom">--top-ports</option>
                        </select>
                    </div>

                    {showPortNumber && (
                        <div className="mb-4">
                            <label htmlFor="portNumber" className="text-white mr-2">
                Numéro de port :
                            </label>
                            <input
                                type="text"
                                id="portNumber"
                                name="portNumber"
                                className="bg-white rounded px-2 py-1"
                                value={customPortNumber}
                                onChange={handleCustomPortChange}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="bg-white text-blue-500 rounded px-4 py-2"
                    >
            Soumettre
                    </button>
                </form>
            </div>
        </div>
    )
}

export default function Home() {
    return (
        <div>
            <Menu />
            <Requetes />
        </div>
    )
}
