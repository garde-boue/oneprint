import React, {FC, PropsWithChildren} from "react"
import "../styles/styles.scss"
import Footer from "./Footer";
import {Link} from "gatsby";
import WeekSelector from "./WeekSelector";

const MainLayout:FC<PropsWithChildren> = ({ children }) => {
    const title = 'One print a week • Une image par semaine';

    return (
        <div className={`layout`}>
            <div className="intro__title">
                <Link to={"/"} className={"intro__title__link"}>{title}</Link>
                <WeekSelector />
            </div>
            {children}
            <Footer />
        </div>
    )
}

export default MainLayout