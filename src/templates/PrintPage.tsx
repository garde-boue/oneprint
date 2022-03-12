import * as React from "react"
import Helmet from "react-helmet"
import "../styles/styles.scss"
import {graphql, Link} from "gatsby";
import Print from "../components/Print";
import Footer from "../components/Footer";

// markup
const PrintPage = ({data}) => {
    const {print} = data
    const {title='', title_en='', week=''} = print.frontmatter;
    const meta_title = [title,title_en].filter(t=>!!t).join(' • ');
    return (
        <div className={"page page--print"}>
            <Helmet>
                <title>{week.toString()} • {meta_title} • one print a week</title>
            </Helmet>
            <Print print={print} mode={"page"} />
        </div>
    )
}

export default PrintPage

export const query = graphql`
    query($id: String) {
        print:markdownRemark(
            id: {eq: $id}
        ) {
            ... Print
        }
    }
`
