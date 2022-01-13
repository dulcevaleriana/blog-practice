import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export default function Comments() {
    const [commentBoolean, setCommentBoolean] = useState(false);

    return(
        <div className="class-Comments">
            {commentBoolean ? (
                <button onClick={() => setCommentBoolean(false)}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
            )
            :
            (
                <button onClick={() => setCommentBoolean(true)}>
                    <FontAwesomeIcon icon={faComment} />
                </button>
            )}
            {commentBoolean && (
                <div>
                    <form>
                        <h5>Commentss</h5>
                        <input name="name" type="text" placeholder="Write your name"/>
                        <textarea />
                        <button>
                            send
                        </button>
                    </form>
                    <div>
                        <div>
                            <h6>Name</h6>
                            <p>
                                comment
                            </p>
                            <hr/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}