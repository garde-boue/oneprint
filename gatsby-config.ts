import {GatsbyConfig} from "gatsby";

const config:GatsbyConfig =  {
  graphqlTypegen: true,
  siteMetadata: {
    title: `One print a week • Une image par semaine`,
    description: `1 print a week est un projet mené sur l’année 2022, il débute en février et s’achèvera l’année prochaine. Chaque semaine, j’imprime une image.`,
    siteUrl: `https://oneprint.anem.name`
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": `${__dirname}/src/images/icon.png`
    }
  }, "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": `${__dirname}/src/images/`
    },
    __key: "images"
  }, {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
      __key: "contents"
    },
  ]
};

export default config;