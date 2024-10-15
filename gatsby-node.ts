import express from 'express';
import { parseMDX } from '@tinacms/mdx';
import { GatsbyNode } from 'gatsby';
import path from 'path';
import { queriesQuery, fragsQuery } from './tina/__generated__/queries';

// Suppression de l'import direct des queries gql (utilisation du loader à la place)

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = (await graphql(`
        {
            allFile(filter: { extension: { eq: "mdx" } }) {
                edges {
                    node {
                        id
                        childMdx {
                            frontmatter {
                                slug
                            }
                            body
                        }
                    }
                }
            }
        }
    `)) as { data: { allFile: { edges: { node: { childMdx: { frontmatter: { slug: string }; body: string } } }[] } } };

    // Utilisation des queries exportées à partir du fichier queries.js
    const collections = [
        {
            name: 'post',
            query: `
                ${fragsQuery}
                ${queriesQuery}
            `, // Inclusion des fragments et des queries
        },
        {
            name: 'recipe',
            query: `
                ${fragsQuery}
                ${queriesQuery}
            `, // Utilisation des mêmes fragments et queries pour les recettes
        },
    ];

    collections.forEach((collection) => {
        console.log(`Collection: ${collection}`);
        result.data.allFile.edges.forEach(
            ({ node }: { node: { childMdx: { frontmatter: { slug: string }; body: string } } }) => {
                const { frontmatter, body } = node.childMdx;

                createPage({
                    path: `${collection.name}/${frontmatter.slug.toLowerCase()}`,
                    component: path.resolve(`./src/templates/${collection.name}.js`),
                    context: {
                        parsedMdx: parseMDX(
                            body,
                            { type: 'rich-text', name: 'markdownParser', parser: { type: 'markdown' } },
                            (s: string) => s
                        ),
                        variables: { relativePath: frontmatter.slug + '.mdx' },
                        query: collection.query, // Utilisation de la query spécifique définie pour chaque collection
                    },
                    defer: true,
                });
            }
        );
    });
};

//Required as per https://tina.io/docs/frameworks/gatsby/#allowing-static-adminindexhtml-file-in-dev-mode
exports.onCreateDevServer = ({ app }: { app: Express }) => {
    app.use('/admin', express.static('public/admin'));
};
