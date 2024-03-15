import React from "react";
import {GatsbyImage, IGatsbyImageData} from "gatsby-plugin-image";
import {graphql} from "gatsby";
import { MasonryPrintProps } from "../pages/index";

interface PrintPosterFrontmatter {
    week?: number
    title?: string
    title_en?: string
    poster?: PrintPosterImageProps
}

export interface PrintPosterImageProps {
    childImageSharp:{
        gatsbyImageData: IGatsbyImageData
        purple: IGatsbyImageData
    }
}

export interface PrintPosterProps {
    frontmatter:PrintPosterFrontmatter
}

export interface PrintPosterBlockProps {
    print: MasonryPrintProps
}

const PrintPoster = ({print}:PrintPosterBlockProps)=>{
    const {frontmatter} = print
    const {poster, title, title_en} = {...frontmatter}
    const gatsbyImageData = poster?.childImageSharp?.gatsbyImageData;
    const purple = poster?.childImageSharp?.purple;
    const alt = title && title_en ? `${title} • ${title_en}` : title || title_en || "";
    return <div className={"print-poster"}>
        {purple && <GatsbyImage alt={""} image={purple} loading={"lazy"} />}
        {gatsbyImageData && <GatsbyImage alt={alt} image={gatsbyImageData} className={"hover"} />}
    </div>
}
export default PrintPoster
export const query = graphql`
  fragment PrintPoster on MarkdownRemark {
      frontmatter {
          week
          title
          title_en
          poster {
              childImageSharp {
                  gatsbyImageData(
                      width: 240
                      formats: AUTO
                      outputPixelDensities: 1
                      jpgOptions: {quality: 75}
                  ) 
                  purple: gatsbyImageData(
                      width: 240
                      formats: AUTO
                      outputPixelDensities: 1
                      jpgOptions: {quality: 75}
                      transformOptions: {duotone: {highlight: "#FFFFFF", shadow: "#B300DA"}}
                  )
              }
          }
      }
  }
`
