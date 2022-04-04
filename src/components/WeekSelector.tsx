import React, {BaseSyntheticEvent, Key} from "react";
import {graphql, navigate, StaticQuery} from "gatsby";

const WeekSelector = ()=> {
    async function selectItem(e:BaseSyntheticEvent){
        const week = e.target.value
        const printEl = document.querySelector(`[data-week="${week}"]`)
        if(week==='/'){
            await navigate(`/`)
        }else if(printEl){
            printEl.scrollIntoView();
        }else{
            await navigate(`/week/${week}`)
        }
    }
    return <form className={"week-selector"}>
        <StaticQuery query={graphql`
                    query{
                        prints:allMarkdownRemark(
                            filter: {frontmatter: {week: {gt: 0}, preview: {ne: "yes"}}}
                            sort: {fields: frontmatter___week, order: DESC}
                        ) {
                            nodes {
                                frontmatter{
                                    week
                                    title
                                    title_en
                                }
                            }
                        }
                    }
                    `} render={(data)=>{
            const options = data.prints.nodes;
            return  <select id={"select-nav"} onChange={selectItem}>
                <option value={"/"}>Toutes les semaines</option>
                {options.map((print:any,key:Key)=>{
                    const {title, title_en, week} = print.frontmatter
                    return <option key={key} value={week}>{week} → {[title,title_en].filter(t=>!!t).join(' • ')}</option>
                })}
            </select>
        }} />
    </form>
}
export default WeekSelector