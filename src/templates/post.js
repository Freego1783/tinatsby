'use client';

import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { useTina, tinaField, useEditState } from 'tinacms/dist/react';

const Post = ({ pageContext }) => {
    const { edit } = useEditState();
    const { query, variables, parsedMdx } = pageContext;

    const { data } = useTina({
        query: query,
        variables: variables,
        data: parsedMdx,
    });
    console.log(data);

    if (edit) {
        return (
            <div>
                <h1>Post page:</h1>
                <h1 data-tina-field={tinaField(data?.post, 'title')}>{data?.post?.title}</h1>

                <div data-tina-field={tinaField(data?.post, 'body')}>
                    <TinaMarkdown content={data?.post?.body} />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <TinaMarkdown content={data} />
            </div>
        );
    }
};

export default Post;
