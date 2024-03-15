import * as React from "react"
import { graphql, HeadFC, PageProps} from "gatsby";
import Print, {PrintProps} from "../components/Print";
import PrintOgImage, {PrintOgImageProps} from "../components/PrintOgImage";
import {Key} from "react";
import {absUrl, siteDescription} from "../utils/Website";

interface FullListPageProps extends PageProps{
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

const FullListPage = ({data}:FullListPageProps) => {
  const {prints,index} = data
  const {html} = index
    return (
    <div className={"page"}>
        <main className="intro">
            <div className={"intro__content"} dangerouslySetInnerHTML={{__html:html}} />
        </main>
        <div className="prints">
            {(prints.nodes||[]).map((print:PrintProps,key:Key)=><Print key={key} print={print} />)}
        </div>
    </div>
  )
}

export default FullListPage

export const pageQuery = graphql`
    query FullListPage {
        index:markdownRemark(frontmatter: {id: {eq: "index"}}) {
            frontmatter {
                title
            }
            html
        }
        prints: allMarkdownRemark(
            filter: {frontmatter: {week: {gt: 0}, preview: {ne: "yes"}}}
            sort: {frontmatter: {week: DESC}}
        ) {
            nodes {
                ... Print
            }
        }
    }
`

export const Head:HeadFC<FullListPageProps["data"]> = (props) => {
    const {data} = props;
    const {index, prints} = data
    const {frontmatter} = index
    const {title='…'} = frontmatter
    const meta_title = `${title} • Anne-Émilie Philippe`;
    const meta_description = siteDescription();
    const latestPrint = prints.nodes[0] as PrintOgImageProps["print"];
    return <>
        <html lang="fr" />
        <title>{meta_title}</title>
        <meta name={"description"} content={meta_description}/>
        <meta property="og:title" content={meta_title}/>
        <meta property="og:description" content={meta_description}/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={absUrl("/")}/>
        <meta property="og:locale" content={"fr"}/>
        <meta name="twitter:site" content="@isitbook"/>
        <meta name="twitter:creator" content="@isitbook"/>
        <meta name="twitter:title" content={meta_title}/>
        <meta name="twitter:description" content={meta_description}/>
        <PrintOgImage print={latestPrint} />
    </>
}
