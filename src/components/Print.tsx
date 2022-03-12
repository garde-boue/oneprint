import React from "react";
import {GatsbyImage, getImage, IGatsbyImageData} from "gatsby-plugin-image";
import {graphql, Link} from "gatsby";

const PrintImage = ({image, title})=>{
    const imgData:IGatsbyImageData | undefined = getImage(image)
    const {width=1920} = imgData
    return imgData && <div className={`print__image print__image--${width/160}`}>
        <GatsbyImage alt={title} image={imgData} />
    </div>
}

const Print = ({print, mode='block'})=>{
    const isBlock = mode ==='block';
    const {frontmatter={}, html=''} = print
    const {week=0, date_from='', date_to='', title='', images=[], instagram='', title_en=''} = frontmatter
    const date_from_parts = date_from.split(' ')
    const date_to_parts = date_to.split(' ')
    const date_from_auto = date_from_parts[1] === date_to_parts[1] ? date_from_parts[0] : date_from;
    const title_elements = <>
        {title && <span className="print__title print__title--fr">{title} </span>}
        {title_en && <span className="print__title print__title--en" lang={"en"}>{title_en} </span>}
    </>
    return <article className={"print"} data-week={week}>
        <div className="print__week">Semaine {week} </div>
        <div className="print__date">du {date_from_auto} au {date_to} </div>
        {isBlock ?
            <Link className={"print__titles print__titles--link"} to={`/week/${week}`}>{title_elements}</Link>:
            <div className={"print__titles"}>{title_elements}</div>
        }
        <div className="print__content" dangerouslySetInnerHTML={{__html:html}} />
        {instagram && <a href={instagram} target={"_blank"} className={"print__instagram"}><span>Instagram </span></a>}
        <div className="print__images">{images.map((image,i)=>
            <PrintImage key={i} image={image} title={title||title_en||''}/>)}
        </div>
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
`
