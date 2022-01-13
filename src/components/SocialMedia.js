import React, {useState} from "react";
import { SocialIcon } from 'react-social-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default function SocialMedia() {
    const [socialMediaBoolean, setSocialMediaBoolean] = useState(false);

    return(
        <div className="class-SocialMedia">
        {socialMediaBoolean ? <FontAwesomeIcon icon={faAngleLeft} onClick={() => setSocialMediaBoolean(false)} />:<FontAwesomeIcon icon={faAngleRight} onClick={() => setSocialMediaBoolean(true)} />}
        {socialMediaBoolean && (
            <div>
                <SocialIcon url="https://twitter.com/" target="_black"/>
                <SocialIcon url="https://facebook.com/" target="_black"/>
                <SocialIcon url="https://youtube.com/" target="_black"/>
                <SocialIcon url="https://pinterest.com/" target="_black"/>
            </div>
        )}
        </div>
    )
}