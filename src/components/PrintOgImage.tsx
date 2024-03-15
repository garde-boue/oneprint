import {absUrl} from "../utils/Website";
import React from "react";
import {PrintImageProps} from "./Print";

export interface PrintOgImageProps {
    print: {
        frontmatter: {
            images: [PrintImageProps]
        }
    }
}

const PrintOgImage = ({print}:PrintOgImageProps) => {
    const {images=[]} = print.frontmatter
    const biggestImage = [...images].sort((a,b)=>{
        const aWidth = a.childImageSharp.original.width,
            bWidth = b.childImageSharp.original.width;
        return aWidth-bWidth;
    }).pop();
    let metaWrapper = <></>;
    if(biggestImage){
        const ogImageUrl = absUrl(biggestImage.childImageSharp.og_image.images.fallback.src)
        metaWrapper = <>
            <meta property="og:image:url" content={ogImageUrl} />
            <meta property="og:image:width" content={"1200"} />
            <meta property="og:image:height" content={"630"} />
            <meta property="og:image:type" content={"image/jpeg"} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={ogImageUrl} />
        </>
    }
    return metaWrapper
}

export default PrintOgImage