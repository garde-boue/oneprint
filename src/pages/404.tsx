import * as React from "react"
import {Link} from "gatsby"
import Footer from "../components/Footer";

// markup
const NotFoundPage = () => {
    return (
        <main>
            <title>Page non trouvée</title>
            <div className="intro">
                <h1 className={"intro__title"}>One print a week • Une image par semaine</h1>
                <p>Page non trouvée, désolé…</p>
                <p><Link to={"/"}>revenir à la page d'accueil.</Link></p>
            </div>
            <Footer/>
        </main>
    )
}

export default NotFoundPage
