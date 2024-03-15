import React from "react";
import {GatsbyImage, IGatsbyImageData} from "gatsby-plugin-image";
import {graphql} from "gatsby";
import {MasonryPrintProps} from "../pages/masonry";

interface PrintPosterFrontmatter {
    poster?: [PrintPosterImageProps]
}

export interface PrintPosterImageProps {
    childImageSharp:{
        gatsbyImageData: IGatsbyImageData
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
    const {poster, title} = {...frontmatter}
    const gatsbyImageData = poster?.childImageSharp?.gatsbyImageData;
    return <div className={"print-poster"}>
        {gatsbyImageData && <GatsbyImage alt={title||""} image={gatsbyImageData} />}
    </div>
}
export default PrintPoster
export const query = graphql`
  fragment PrintPoster on MarkdownRemark {
      frontmatter {
          week
          poster {
              childImageSharp {
                  gatsbyImageData(
                      width: 240
                      formats: AUTO
                      outputPixelDensities: 1
                      jpgOptions: {quality: 75}
                      # transformOptions: {duotone: {highlight: "#FFFFFF", shadow: "#B300DA"}}
                  )
              }
          }
      }
  }
`
