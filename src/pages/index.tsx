import * as React from "react"
// @ts-ignore
import Helmet from "react-helmet"
import {graphql, PageProps} from "gatsby";
import Print, {PrintOgImage, PrintProps} from "../components/Print";
import {Key} from "react";
import {absUrl, siteDescription} from "../utils/Website";

interface IndexPageProps extends PageProps{
    data:{
        index:{
            frontmatter:{
                title:string
            }
            html:string
        }
        prints:{
            nodes:[PrintProps]
        }
    }
}

const IndexPage = ({data}:IndexPageProps) => {
  const {prints,index} = data
  const {frontmatter,html} = index
  const {title='…'} = frontmatter
    const meta_title = `${title} • Anne-Émilie Philippe`;
    const meta_description = siteDescription();
    const latestPrint = prints.nodes[0];
    return (
    <div className={"page"}>
        <Helmet>
            <title>{meta_title}</title>
            <meta name={"description"} content={meta_description} />
            <meta property="og:title" content={meta_title} />
            <meta property="og:description" content={meta_description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={absUrl("/")} />
            <meta name="twitter:site" content="@isitbook" />
            <meta name="twitter:creator" content="@isitbook" />
            <meta name="twitter:title" content={meta_title} />
            <meta name="twitter:description" content={meta_description} />
        </Helmet>
        <PrintOgImage print={latestPrint} />
        <main className="intro">
            <div className={"intro__content"} dangerouslySetInnerHTML={{__html:html}} />
        </main>
        <div className="prints">
            {(prints.nodes||[]).map((print:PrintProps,key:Key)=><Print key={key} print={print} />)}
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
            filter: {frontmatter: {week: {gt: 0}, preview: {ne: "yes"}}}
            sort: {fields: frontmatter___week, order: DESC}
        ) {
            nodes {
                ... Print
            }
        }
    }
`
