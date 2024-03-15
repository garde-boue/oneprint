import * as React from "react"
import {graphql, HeadFC, Link, PageProps} from "gatsby";
import {Key} from "react";
import {absUrl, siteDescription} from "../utils/Website";
import PrintPoster from "../components/PrintPoster";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

interface MasonryPageProps extends PageProps{
    data:Queries.MasonryPageQuery
}

export type MasonryPrintProps = MasonryPageProps["data"]["prints"]["nodes"][0];

const MasonryPage = ({data}:MasonryPageProps) => {
  const {prints} = data
    return (
    <div className={"page"}>
        <ResponsiveMasonry columnsCountBreakPoints={{0:1, 240: 2, 490: 3, 740: 4}}>
            <Masonry className={"prints--masonry"}>
                {(prints.nodes||[]).map((print,key:Key)=>
                    <Link key={key} to={`/week/${print.frontmatter?.week}`}>
                        <PrintPoster print={print} />
                    </Link>
                )}
            </Masonry>
        </ResponsiveMasonry>
    </div>
  )
}

export default MasonryPage

export const pageQuery = graphql`
    query MasonryPage {
        index:markdownRemark(frontmatter: {id: {eq: "index"}}) {
            frontmatter {
                title
            }
        }
        prints: allMarkdownRemark(
            filter: {frontmatter: {week: {gt: 0}, preview: {ne: "yes"}}}
            sort: {frontmatter: {week: DESC}}
        ) {
            nodes {
                ... PrintPoster
            }
        }
    }
`

export const Head:HeadFC<MasonryPageProps["data"]> = (props) => {
    const {data} = props;
    const {index} = data
    const {frontmatter} = {...index}
    const {title='…'} = {...frontmatter}
    const meta_title = `${title} • Anne-Émilie Philippe`;
    const meta_description = siteDescription();
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
    </>
}
