import * as React from "react"
import "../styles/styles.scss"
import {graphql, PageProps} from "gatsby";
import Print, {PrintProps} from "../components/Print";
import {absUrl} from "../utils/Website";
import PrintOgImage from "../components/PrintOgImage";

interface PrintPageProps extends PageProps{
    data:{
        print: PrintProps
    }
}

// markup
const PrintPage = ({data}:PrintPageProps) => {
    const {print} = data
    return (
        <main className={"page page--print"}>
            <Print print={print} mode={"page"} />
        </main>
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

export const Head:React.FC<PrintPageProps> = (props) => {
    const {data} = props;
    const {print} = data
    const {excerpt} = print
    const {title='', title_en='', week='', og_published_time='', images=[], date_published=''} = print.frontmatter;
    const meta_title = `${week.toString()} • ${[title,title_en].filter(t=>!!t).join(' • ')}`;
    const pageUrl = absUrl(`/week/${week}`)
    const structuredPerson = {
        "@type": "Person",
        "name": "Anne-Émilie Philippe",
        "url": "https://www.anem.name"
    }
    const structuredDatas = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": pageUrl
        },
        "headline": meta_title,
        "image": images.map(i=>absUrl(i.publicURL)),
        "datePublished": date_published,
        "dateModified": date_published,
        "author": structuredPerson,
        "publisher": structuredPerson
    }
    return <>
        <html lang="fr" />
        <title>{meta_title}</title>
        <link rel="canonical" href={pageUrl}/>
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:url" content={pageUrl}/>
        <meta property="og:title" content={meta_title}/>
        <meta property="og:description" content={excerpt}/>
        <meta property="og:type" content="article"/>
        <meta property="og:article:section" content="Art"/>
        <meta property="og:article:author" content="Anne-Émilie Philippe"/>
        <meta property="og:article:published_time" content={og_published_time}/>
        <meta property="og:locale" content="fr_FR" />
        <meta name="twitter:site" content="@isitbook"/>
        <meta name="twitter:creator" content="@isitbook"/>
        <meta name="twitter:title" content={meta_title}/>
        <meta name="twitter:description" content={excerpt}/>
        <PrintOgImage print={print} />
        <script type="application/ld+json">{JSON.stringify(structuredDatas)}</script>
    </>
}
