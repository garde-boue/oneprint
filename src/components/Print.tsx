// @ts-ignore
import Helmet from "react-helmet"
import React, {Key} from "react";
import {GatsbyImage, getImage, IGatsbyImageData} from "gatsby-plugin-image";
import {graphql, Link} from "gatsby";
import {absUrl} from "../utils/Website";

interface PrintImageBlockProps {
    image: PrintImageProps,
    title?: string
}

const PrintImage = ({image, title=''}:PrintImageBlockProps)=>{
    if(image){
        const imgData = getImage(image)
        if(imgData){
            const {width=1920} = imgData
            return <div className={`print__image print__image--${width/160}`}>
                <GatsbyImage alt={title} image={imgData} />
            </div>
        }
    }
    return <></>

}

interface PrintFrontmatter {
    week?: number,
    og_published_time?: string
    date_published?: string
    date_from?: string
    date_to?: string
    title?: string
    title_en?: string
    instagram?: string
    images?: [PrintImageProps]
    videos?: [string]
    hashtags?: [string]
}

export interface PrintImageProps extends IGatsbyImageData{
    publicURL:string
    childImageSharp:{
        gatsbyImageData:{

        }
        original: {
            width: number
            height: number
        }
        og_image: {
            images:{
                fallback:{
                    src:string
                }
            }
        }
    }
}

export interface PrintProps {
    frontmatter:PrintFrontmatter
    html:string
    excerpt:string
}

export interface PrintBlockProps {
    mode?: string,
    print: PrintProps
}

const Print = ({print, mode='block'}:PrintBlockProps)=>{
    const isBlock = mode ==='block';
    const {html=''} = print
    const frontmatter = print.frontmatter
    const {
        week=0,
        date_from='',
        date_to='',
        title='',
        title_en='',
        images=[],
        instagram='',
        videos=[],
        hashtags=['1printaweek']
    } = frontmatter
    const date_from_parts = date_from.split(' ')
    const date_to_parts = date_to.split(' ')
    const date_from_auto = date_from_parts[1] === date_to_parts[1] ? date_from_parts[0] : date_from;
    const title_elements = <>
        {title && <span className="print__title print__title--fr">{`${title} `}</span>}
        {title_en && <span className="print__title print__title--en" lang={"en"}>{`${title_en} `}</span>}
    </>
    return <article className={"print"} data-week={week}>
        <h3 className="print__week">{`Semaine ${week} `}</h3>
        <div className="print__date">{`du ${date_from_auto} au ${date_to} `}</div>
        {isBlock ?
            <Link className={"print__titles print__titles--link"} to={`/week/${week}`}>{title_elements}</Link>:
            <h1 className={"print__titles"}>{title_elements}</h1>
        }
        <div className="print__content" dangerouslySetInnerHTML={{__html:html}} />
        <nav className="print__instagram">
            {instagram && <a href={instagram} target={"_blank"} className={"print__instagram__icon"} rel={"noopener,noopener"} aria-label={"Instagram"} />}
            {(hashtags||['1printaweek']).map((hashtag,key:Key)=>
                <a key={key} href={`https://www.instagram.com/explore/tags/${hashtag}/`}
                   title={`Instagram #${hashtag}`}
                   target={"_blank"} className={"print__instagram__hashtag"}>{`#${hashtag} `}</a>
            )}
        </nav>
        {!!videos &&
            <div className="print__videos">{videos.map((video: string, i: Key) =>
                <video key={i} src={video} className={"print__video"}
                       playsInline={true}
                       controls={true}
                       title={title || title_en || ''}/>)}
            </div>
        }
        {!!images &&
            <div className="print__images">{images.map((image: PrintImageProps, i: Key) =>
                <PrintImage key={i} image={image} title={title || title_en || ''}/>)}
            </div>
        }
    </article>
}
export default Print

export const PrintOgImage = ({print}:PrintBlockProps) => {
    const {images=[]} = print.frontmatter
    const biggestImage:PrintImageProps|undefined = [...images].sort((a:PrintImageProps,b:PrintImageProps)=>{
        const aWidth = a.childImageSharp.original.width,
            bWidth = b.childImageSharp.original.width;
        return aWidth-bWidth;
    }).pop();
    let metaWrapper = <></>;
    if(biggestImage){
        const ogImageUrl = absUrl(biggestImage.childImageSharp.og_image.images.fallback.src)
        metaWrapper = <Helmet>
            <meta property="og:image:url" content={ogImageUrl} />
            <meta property="og:image:width" content={"1200"} />
            <meta property="og:image:height" content={"630"} />
            <meta property="og:image:type" content={"image/jpeg"} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={ogImageUrl} />
        </Helmet>
    }
    return metaWrapper
}

export const query = graphql`
  fragment Print on MarkdownRemark {
      html
      excerpt
      frontmatter {
          title
          title_en
          week
          instagram
          hashtags
          og_published_time: date(formatString: "YYYY-MM-DD")
          date_from:date(locale: "fr", formatString: "D MMMM")
          date_to(locale: "fr", formatString: "D MMMM")
          date_published: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
          images {
              publicURL
              childImageSharp {
                  gatsbyImageData(layout: CONSTRAINED)
                  original {
                      width
                      height
                  }
                  og_image: gatsbyImageData(
                      width: 1200
                      height: 630
                      formats: JPG
                      outputPixelDensities: 1
                      jpgOptions: {quality: 75}
                      transformOptions: {duotone: {highlight: "#FFFFFF", shadow: "#B300DA"}}
                  )
              }
          }
          videos
      }
  }
`
