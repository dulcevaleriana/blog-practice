import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { useParams } from "react-router-dom";
import SanityClient from "../client.js";
import BlockContent from '@sanity/block-content-to-react';

import ImageUrlBuilder from "@sanity/image-url";

import '../scss/post.scss';

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

    const serializers = {
        types: {
          code: (props) => (
            <pre data-language={props.node.language}>
              <code>{props.node.code}</code>
            </pre>
          ),
        },
    }

    if(!postData) return <div>Loading...</div>;

    console.log(postData)

    return (
        <div className="bg-slate-900 min-h-screen">
            <img src={urlFor(postData.mainImage).width(200).url()} alt="Author" className="w-full object-cover rounded-t absolute blur-sm opacity-50" style={{height: "400px"}}/>
            <div className="container shadow-lg mx-auto bg-slate-900 rounded-lg p-12">
                <div className="relative">
                    <div className="absolute h-full w-full flex items-center justify-center p-8">
                        <div className="bg-slate-900 bg-opacity-75 rounded p-12">
                            <h2 className="text-3xl lg:text-6xl mb-4 text-white">{postData.title}</h2>
                            <div className="flex justify-center">
                                <img src={urlFor(postData.authorImage).width(100).url()} alt="Author" className="w-10 h-10 rounded-full"/>
                                <h4 className="flex items-center pl-2 text-2xl text-gray-500">{postData.name}</h4>
                            </div>
                        </div>
                    </div>
                    <img src={urlFor(postData.mainImage).width(200).url()} alt="Author" className="w-full object-cover rounded-t" style={{height: "400px"}}/>
                </div>
                <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full text-gray-500 bg-slate-800">
                    <BlockContent 
                        blocks={postData.body} 
                        projectId={SanityClient.clientConfig.projectId}
                        dataset={SanityClient.clientConfig.dataset}
                        serializers={serializers}
                    />
                </div>
            </div>
        </div>
    )
}
