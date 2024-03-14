import {GatsbyNode} from "gatsby";
import path from "path";

const createPages:GatsbyNode["createPages"] = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const PrintPage = path.resolve('src/templates/PrintPage.tsx');
    const results = await graphql<any>(`
        query CreatePages {
            prints: allMarkdownRemark(
                filter: {frontmatter: {week: {gt: 0}}}
                sort: {frontmatter: {week: ASC}}
            ) {
                nodes {
                    id
                    frontmatter {
                        week
                    }
                }
            }
        }
    `);
    results.data?.prints.nodes.forEach((print: { id:string, frontmatter:{week:string} }) => {
        const { id } = print;
        const { week="" } = {...print.frontmatter};
        console.log(`createPage: /week/${week}`);
        createPage({
            path: `/week/${week}`,
            component: PrintPage,
            context: {
                id,
                week
            }
        });
    });
};

export { createPages };