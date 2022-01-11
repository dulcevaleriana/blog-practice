import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SanityClient from "../client.js";

export default function HomePost() {
    const [homePostData, setHomePostData] = useState(null);

    useEffect(()=>{
        SanityClient.fetch(
            `*[_type == "post"]{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                }
            }`
        )
        .then((data)=> setHomePostData(data))
        .catch(console.error);
    },[])

    console.log(homePostData)
    
    return(
        <div className="bg-slate-900 min-h-screen p-12">
            <div className="container mx-auto">
                <h2 className="text-5xl flex justify-center text-gray-200 mb-5">Wellcome to Blog Practice</h2>
                <h6 className="text-lg text-gray-500 flex justify-center mb-12">Read my last post!</h6>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    { homePostData &&
                        homePostData.map((item, key) => (
                            <Link to={'/' + item.slug.current} key={item.slug.current}>
                                <span key={key} className="bg-white block h-64 relative rounded shadow leading-snug border-l-8 border-green-300">
                                    <img src={item.mainImage.asset.url} alt="img" className="w-full h-full rounded-r object-cover absolute"/>
                                    <span className="block relative h-full flex justify-end items-end pr-4 pb-4">
                                        <h2 className="text-gray-800 text-lg font-bold px-3 py-4 bg-green-300 text-slate-900 bg-opacity-80 rounded">{item.title}</h2>
                                    </span>
                                </span>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
