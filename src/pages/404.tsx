import * as React from "react"
import {Link} from "gatsby"

// markup
const NotFoundPage = () => {
    return (
        <div className={"page"}>
            <title>Page non trouvée</title>
            <div className="intro">
                <h1 className={"intro__title"}>Page non trouvée, désolé…</h1>
                <p><Link to={"/"}>revenir à la page d'accueil.</Link></p>
            </div>
        </div>
    )
}

export default NotFoundPage
