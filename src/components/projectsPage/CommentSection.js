import React from "react";

export function CommentSection({comments}) {

    const commentList = comments.map((comment) => {
        return (
            <div className="comment">
                <h3>{comment.user}</h3>
                <p>{comment.note}</p>
                {comment.file && <div><input type="button" value={comment.file}/></div>}
            </div>
        );
    });

    return (
        <section className="comment-section">
            <h1>Comments and Collaborator's Versions:</h1>
            <form>
                <div className="text">
                    <label htmlFor="text">Add a comment:</label>
                    <input type="text" id="text" placeholder="What do you think?" />
                </div>
                <div className="radios">
                    <input type="radio" id="anonymous" name="comment-type" value="anonymous" />
                    <label htmlFor="anonymous">Post as anonymous</label>
                    <input type="radio" id="identified" name="comment-type" value="identified" />
                    <label htmlFor="identified">Post as Person:</label>
                </div>
                <div className="post-buttons-wrapper">
                    <div className="post-buttons">
                        <input type="button" value="Attach new version" />
                        <input type="button" value="Post comment" />
                    </div>
                </div>
            </form>
            {commentList}
        </section>
    );
}

export default CommentSection;
