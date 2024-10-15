'use client';

import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { useTina, tinaField, useEditState } from 'tinacms/dist/react';

const Post = ({ pageContext }) => {
    const { edit } = useEditState();
    const { query, variables, parsedMdx } = pageContext;

    const data = useTina({
        query: query,
        variables: variables,
        data: parsedMdx,
    });
    console.log('page context', pageContext);
    console.log('query', query);
    console.log(data);

    if (edit) {
        return (
            <div>
                <h1>Post page:</h1>
                <h1 data-tina-field={tinaField(data?.data.post, 'title')}>{data?.data.post?.title}</h1>

                <div data-tina-field={tinaField(data?.data.post, 'body')}>
                    <TinaMarkdown content={data?.data.post?.body} />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <TinaMarkdown content={data.data} />
            </div>
        );
    }
};

export default Post;
