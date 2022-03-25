// @ts-ignore
import Helmet from "react-helmet"
import React, {BaseSyntheticEvent, Key, useRef} from "react";
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
    video_path?: string
    video_poster?: string
    video_width?: string
    video_height?: string
    video_muted?: boolean
    video_loop?: boolean
    video_autoplay?: boolean
    video_controls?: boolean
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
        video_path='',
        video_poster='',
        video_width='',
        video_height='',
        video_muted=false,
        video_loop=false,
        video_autoplay=false,
        video_controls=true,
        hashtags=['1printaweek']
    } = frontmatter

    const videoRef = useRef(null)
    const videoDivRef = useRef(null)

    const date_from_parts = date_from.split(' ')
    const date_to_parts = date_to.split(' ')
    const date_from_auto = date_from_parts[1] === date_to_parts[1] ? date_from_parts[0] : date_from;
    const title_elements = <>
        {title && <span className="print__title print__title--fr">{`${title} `}</span>}
        {title_en && <span className="print__title print__title--en" lang={"en"}>{`${title_en} `}</span>}
    </>

    function playVideo(e:BaseSyntheticEvent){
        if(videoRef.current && videoDivRef.current) {
            const video: HTMLVideoElement = videoRef.current,
                playing: boolean = !(video.paused || video.ended || video.seeking || video.readyState < video.HAVE_FUTURE_DATA)
            if (video.muted && !video_muted) video.muted = false;
            if(playing){
                video.pause();
            }else{
                video.play();
            }
        }
    }

    function updateVideoState(e:BaseSyntheticEvent){
        if(videoRef.current && videoDivRef.current) {
            const videoDiv: HTMLDivElement = videoDivRef.current,
                video: HTMLVideoElement = videoRef.current,
                playing: boolean = e.type === 'playing' || e.type === 'play' || !(video.paused || video.ended || video.seeking || video.readyState < video.HAVE_FUTURE_DATA);
            videoDiv.setAttribute('data-playing', playing?'yes':'no');
        }
    }

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
        {!!video_path &&
            <div className="print__videos">
                <div className="print__video" data-controls={video_controls?'yes':'no'} ref={videoDivRef}>
                    <div className={"print__video__placeholder"} style={{maxWidth:video_width}} >
                        <div style={{paddingTop:`${100*parseFloat(video_height)/parseFloat(video_width)}%`}} />
                        <video src={video_path}
                           ref={videoRef}
                           playsInline={true}
                           controls={video_controls}
                           muted={video_muted || video_autoplay}
                           loop={video_loop}
                           autoPlay={video_autoplay}
                           width={video_width}
                           height={video_height}
                           title={title || title_en || ''}
                           poster={video_poster}
                           onClick={playVideo}
                           onProgress={updateVideoState}
                           onPlaying={updateVideoState}
                           onEnded={updateVideoState}
                           onPlay={updateVideoState}
                           onPause={updateVideoState}
                           onCanPlay={updateVideoState}
                        />
                    </div>
                </div>
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
          video_path
          video_poster
          video_width
          video_height
          video_muted
          video_loop
          video_autoplay
          video_controls
      }
  }
`
