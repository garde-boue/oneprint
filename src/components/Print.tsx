import React, {Key, ReactNode} from "react";
import {GatsbyImage, getImage, ImageDataLike} from "gatsby-plugin-image";
import {graphql, Link} from "gatsby";

interface PrintImageProps {
    image?: ImageDataLike,
    title?: string
}

const PrintImage = ({image, title=''}:PrintImageProps)=>{
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
    date_from?: string
    date_to?: string
    title?: string
    title_en?: string
    instagram?: string
    images?: [ImageDataLike]
    videos?: [string]
    hashtags?: [string]
}

export interface PrintProps {
    mode?: string,
    print: {
        frontmatter?:PrintFrontmatter
        html?:string
    }
}

const Print = ({print={}, mode='block'}:PrintProps)=>{
    const isBlock = mode ==='block';
    const {html=''} = print
    const frontmatter:PrintFrontmatter = print.frontmatter || {}
    const {
        week=0,
        date_from='',
        date_to='',
        title='',
        title_en='',
        images=[],
        instagram='',
        videos=[],
        hashtags=[]
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
            {instagram && <a href={instagram} target={"_blank"} className={"print__instagram__icon"} rel={"noopener,noopener"}><span>{'Instagram '}</span></a>}
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
                       muted={true}
                       controls={true}
                       title={title || title_en || ''}/>)}
            </div>
        }
        {!!images &&
            <div className="print__images">{images.map((image: ImageDataLike, i: Key) =>
                <PrintImage key={i} image={image} title={title || title_en || ''}/>)}
            </div>
        }
    </article>
}
export default Print

export const query = graphql`
  fragment Print on MarkdownRemark {
      html
      frontmatter {
          title
          title_en
          week
          instagram
          hashtags
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
          videos
      }
  }
`
