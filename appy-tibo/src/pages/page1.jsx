import React from "react"
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


function Accueil() {
    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col md:flex-row md:space-x-8">
                <img
                    src="/image1.jpg"
                    alt="Image 1"
                    className="w-64 h-64 object-cover"
                />
                <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold mb-4">Bienvenue sur notre site</h2>
                    <p className="text-lg mb-4">
                    </p>
                    <p className="text-lg mb-4">
                    </p>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            En savoir plus
                    </button>
                </div>
            </div>
        </div>
    )
}



export default function Home() {
    return (
        <div>
            <Menu />
            <Accueil />
        </div>
    )
}
