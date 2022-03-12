const path = require(`path`)

exports.createPages = async ({graphql, actions}) => {
    const { createPage } = actions
    const PrintPage = path.resolve(`src/templates/PrintPage.tsx`)
    const results = await graphql(`
{
  prints: allMarkdownRemark(
    filter: {frontmatter: {week: {gt: 0}}}
    sort: {fields: frontmatter___week, order: ASC}
  ) {
    nodes {
      id
      frontmatter {
        week
      }
    }
  }
}
    `)
    results.data.prints.nodes.forEach(print=>{
        const {id} = print
        const {week} = print.frontmatter
        createPage({
            path: `/week/${week}`,
            component: PrintPage,
            context: {
                id: id,
                week: week
            },
        })
    });
}