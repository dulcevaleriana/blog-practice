import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { useParams } from "react-router-dom";
import SanityClient from "../client.js";
import BlockContent from '@sanity/block-content-to-react';

import ImageUrlBuilder from "@sanity/image-url";

const builder = ImageUrlBuilder(SanityClient);
function urlFor(source){
    return builder.image(source);
}

export default function Post() {
    const [postData, setPostData] = useState(null);
    const {slug} = useParams();

    useEffect(()=>{
        SanityClient.fetch(
            `*[slug.current == $slug]{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                },
                body,
                "name":author->name,
                "authorImage":author->image
            }`,
            { slug }
        )
        .then((data) => setPostData(data[0]))
        .catch(console.error)
    },[slug]);

    if(!postData) return <div>Loading...</div>;

    console.log(postData)

    return (
        <div>
            <h2>{postData.title}</h2>
            <div>
                <img src={urlFor(postData.mainImage).width(200).url()} alt="Author" />
            </div>
            <div>
                <img src={urlFor(postData.authorImage).width(100).url()} alt="Author" />
                <h4>{postData.name}</h4>
            </div>
            <div>
                <BlockContent 
                    blocks={postData.body} 
                    projectId={SanityClient.clientConfig.projectId}
                    dataset={SanityClient.clientConfig.dataset}
                />
            </div>
        </div>
    )
}
