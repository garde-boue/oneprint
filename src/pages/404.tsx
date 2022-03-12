import * as React from "react"
import {Link} from "gatsby"

// markup
const NotFoundPage = () => {
    return (
        <div className={"page"}>
            <title>Page non trouvée</title>
            <div className="intro">
                <h1 className={"intro__title"}>One print a week • Une image par semaine</h1>
                <p>Page non trouvée, désolé…</p>
                <p><Link to={"/"}>revenir à la page d'accueil.</Link></p>
            </div>
        </div>
    )
}

export default NotFoundPage
