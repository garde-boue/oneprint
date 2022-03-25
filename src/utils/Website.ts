import {graphql, useStaticQuery} from "gatsby";

export const siteMetaData = (key:string):string=>{
    const data = useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    siteUrl
                    title
                }
            }
        }
    `)
    return data.site.siteMetadata[key]
}

export const siteUrl = ():string=>{
    return siteMetaData('siteUrl')
}

export const siteTitle = ():string=>{
    return siteMetaData('siteTitle')
}

export const absUrl = (path:string=''):string=>{
    return siteUrl()+path;
}