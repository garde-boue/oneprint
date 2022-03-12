import React from "react"
import {Helmet} from "react-helmet"
import "../styles/styles.scss"
import Footer from "./Footer";
import {Link} from "gatsby";

export default function MainLayout({ children }) {
    const title = 'One print a week • Une image par semaine';
    return (
        <div className={`layout`}>
            <Helmet htmlAttributes={{
                lang: 'fr',
                title: title
            }}></Helmet>
            <div className="intro__title">
                <Link to={"/"} className={"intro__title__link"}>{title}</Link>
            </div>
            {children}
            <Footer />
        </div>
    )
}

export function wrapPageElement({element,props}){
    return <MainLayout {...props}>{element}</MainLayout>;
}