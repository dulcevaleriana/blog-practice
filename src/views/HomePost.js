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
        <div>
            <h2>HomePost</h2>
            <h6>Lee mis post anteriores</h6>
            <div>
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
    )
}
