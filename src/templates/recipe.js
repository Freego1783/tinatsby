'use client';

import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { useTina, tinaField, useEditState } from 'tinacms/dist/react';

const Recipe = ({ pageContext }) => {
    const { edit } = useEditState();

    const { query, variables, parsedMdx } = pageContext;

    const { data } = useTina({
        query: query,
        variables: variables,
        data: parsedMdx,
    });

    if (edit) {
        return (
            <div>
                <h1>Recipe page:</h1>
                <h2 data-tina-field={tinaField(data?.data.recipe, 'title')}>{data?.data.recipe?.title}</h2>

                <div data-tina-field={tinaField(data?.data.recipe, 'body')}>
                    <TinaMarkdown content={data?.data.recipe?.body} />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Recipe page:</h1>
                <TinaMarkdown content={data.data} />
            </div>
        );
    }
};

export default Recipe;
