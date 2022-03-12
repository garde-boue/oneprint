import React from "react"
import {GatsbyImage, getImage, IGatsbyImageData} from "gatsby-plugin-image";

const PrintImage = ({image})=>{
    const imgData:IGatsbyImageData | undefined = getImage(image)
    const {width=1920} = imgData
    return imgData && <div className={`print__image print__image--${width/160}`}>
        <GatsbyImage alt={""} image={imgData} />
    </div>
}

const Print = ({print})=>{
    const {frontmatter, html} = print
    const {week, date_from, date_to, title, images=[]} = frontmatter
    const date_from_parts = date_from.split(' ')
    const date_to_parts = date_to.split(' ')
    const date_from_auto = date_from_parts[1] === date_to_parts[1] ? date_from_parts[0] : date_from;
    return <div className={"print"}>
        <div className="print__week">Semaine {week} </div>
        <div className="print__date">du {date_from_auto} au {date_to} </div>
        <div className="print__title">{title} </div>
        <div className="print__content" dangerouslySetInnerHTML={{__html:html}} />
        <div className="print__images">{images.map((image,i)=><PrintImage key={i} image={image} />)}</div>
    </div>
}
export default Print