import React from "react";
import {graphql, navigate, StaticQuery} from "gatsby";

const WeekSelector = ()=> {
    function selectItem(e){
        const week = e.target.value
        const printEl = document.querySelector(`[data-week="${week}"]`)
        if(week==='/'){
            navigate(`/`)
        }else if(printEl){
            printEl.scrollIntoView();
        }else{
            navigate(`/week/${week}`)
        }
    }
    return <form className={"week-selector"}>
        <StaticQuery query={graphql`
                    query{
                        prints:allMarkdownRemark(
                            filter: {frontmatter: {week: {gt: 0}}}
                            sort: {fields: frontmatter___week, order: ASC}
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
                {options.map((print,key)=>{
                    const {title, title_en, week} = print.frontmatter
                    return <option key={key} value={week}>{week} → {[title,title_en].filter(t=>!!t).join(' • ')}</option>
                })}
            </select>
        }} />
    </form>
}
export default WeekSelector