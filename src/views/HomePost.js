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
        <div className="bg-orange-100 min-h-screen p-12">
            <div className="container mx-auto">
                <h2 className="text-5xl flex justify-center">Wellcome to Blog Practice</h2>
                <h6 className="text-lg text-gray-500 flex justify-center mb-12">Read my last post!</h6>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    { homePostData &&
                        homePostData.map((item, key) => (
                            <Link to={'/' + item.slug.current} key={item.slug.current}>
                                <span key={key}>
                                    <img src={item.mainImage.asset.url} alt="img" />
                                    <h2>{item.title}</h2>
                                </span>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
