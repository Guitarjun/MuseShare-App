import React from "react";

export function CommentSection({comments}) {

    const commentList = comments.forEach((comment) => {
        return (
            <div className="comment">
                <h3>{comment.user}</h3>
                <p>{comment.note}</p>
                {comment.file && <div><input type="button" value={comment.file}/></div>}
            </div>
        );
    });

    return (
        <div className="comment-section">
            <h2>Comments and Collaborator's Versions:</h2>
            <form>
                <label for="text">Add a comment:</label>
                <input type="text" id="text" placeholder="What do you think?" />
                <input type="radio" id="anonymous" name="comment-type" value="Anonymous" checked />
                <label for="anonymous">Post as anonymous</label>
                <input type="radio" id="identified" name="comment-type" value="Identified" />
                <label for="identified">Post as Person</label>
                <input type="button" value="Post comment" />
                <input type="button" value="Attach new version" />
            </form>
            {commentList}
        </div>
    );
}

export default CommentSection;
