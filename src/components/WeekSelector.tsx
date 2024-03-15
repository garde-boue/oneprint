import React, {BaseSyntheticEvent, Key} from "react";
import {graphql, navigate, useStaticQuery} from "gatsby";

const WeekSelector = ()=> {
    async function selectItem(e:BaseSyntheticEvent){
        const week = e.target.value
        const printEl = document.querySelector(`[data-week="${week}"]`)
        if(week==='/' || week==='/list'){
            await navigate(week)
        }else if(printEl){
            printEl.scrollIntoView();
        }else{
            await navigate(`/week/${week}`)
        }
    }
    const { prints} = useStaticQuery<Queries.WeekSelectorQuery>(graphql`           
        query WeekSelector {
        prints: allMarkdownRemark(
            filter: {frontmatter: {week: {gt: 0}, preview: {ne: "yes"}}}
            sort: {frontmatter: {week: DESC}}
        ) {
            nodes {
                frontmatter{
                    week
                    title
                    title_en
                }
            }
        }
    }`)
    return <form className={"week-selector"}>
        <select id={"select-nav"} onChange={selectItem}>
            <option value={"/"}>Voir tout d'un coup</option>
            <option value={"/list"}>Voir tout en détail</option>
            {prints.nodes.map((print, key: Key) => {
                const {title, title_en, week=""} = {...print.frontmatter}
                return <option key={key} value={week||""}>{prints.nodes.length-(key as number)} → {[title, title_en].filter(t => !!t).join(' • ')}</option>
            })}
        </select>
    </form>
}
export default WeekSelector