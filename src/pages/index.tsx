import * as React from "react"
import Helmet from "react-helmet"
import "../styles/styles.scss"
import {graphql, Link} from "gatsby";
import Print from "../components/Print";
import Footer from "../components/Footer";

// markup
const IndexPage = ({data}) => {
    const {prints,index={}} = data
  const {frontmatter={},html=''} = index
  const {title='…'} = frontmatter
  return (
    <main>
        <Helmet>
            <title>{title}</title>
        </Helmet>
        <div className="intro">
            <h1 className={"intro__title"}>{title}</h1>
            <div className={"intro__content"} dangerouslySetInnerHTML={{__html:html}} />
        </div>
        <div className="prints">
            {(prints.nodes||[]).map((print,key)=><Print key={key} print={print} />)}
        </div>
        <Footer />
    </main>
  )
}

export default IndexPage

export const pageQuery = graphql`
    query {
        index:markdownRemark(frontmatter: {id: {eq: "index"}}) {
            frontmatter {
                title
            }
            html
        }
        prints:allMarkdownRemark(filter: {frontmatter: {week: {gt: 0}}}) {
            nodes {
                html
                frontmatter {
                    title
                    week
                    date_from:date(locale: "fr", formatString: "D MMMM")
                    date_to(locale: "fr", formatString: "D MMMM")
                    images {
                        childImageSharp {
                            gatsbyImageData(layout: CONSTRAINED)
                            original {
                                width
                                height
                            }
                        }
                    }
                }
            }
        }
    }
`
