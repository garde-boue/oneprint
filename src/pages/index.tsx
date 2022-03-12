import * as React from "react"
import Helmet from "react-helmet"
import {graphql} from "gatsby";
import Print from "../components/Print";

// markup
const IndexPage = ({data}) => {
    const {prints,index={}} = data
  const {frontmatter={},html=''} = index
  const {title='…'} = frontmatter
  return (
    <div className={"page"}>
        <Helmet>
            <title>{title} • Anne-Émilie Philippe</title>
        </Helmet>
        <main className="intro">
            <div className={"intro__content"} dangerouslySetInnerHTML={{__html:html}} />
        </main>
        <div className="prints">
            {(prints.nodes||[]).map((print,key)=><Print key={key} print={print} />)}
        </div>
    </div>
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
        prints:allMarkdownRemark(
            filter: {frontmatter: {week: {gt: 0}}}
            sort: {fields: frontmatter___week, order: DESC}
        ) {
            nodes {
                ... Print
            }
        }
    }
`
