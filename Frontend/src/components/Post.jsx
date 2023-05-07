import React, { useState } from "react";

const Post = (props) => {
  const { name, avatar, content, timestamp, image } = props;

  // State for the number of likes and whether the post has been upvoted
  const [likes, setLikes] = useState(0);
  const [upvoted, setUpvoted] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleUpvote = () => {
    setUpvoted(true);
  };

  return (
    <div className="post">
      <div className="post-header">
        <img className="post-avatar" src={avatar} alt={name} />
        <div className="post-info">
          <h2 className="post-name">{name}</h2>
          <p className="post-timestamp">{timestamp}</p>
        </div>
      </div>
      <p className="post-content">{content}</p>
      {image && <img className="post-image" src={image} alt="post" />}
      <div className="post-buttons">
        <button className="post-button post-button-like" onClick={handleLike}>
          {likes} {likes === 1 ? "Upvote" : "Upvote"}
        </button>
        <button
          className={`post-button post-button-upvote ${
            upvoted ? "post-button-upvote-active" : ""
          }`}
          onClick={handleUpvote}
        >
          Upvote
        </button>
      
      </div>
    </div>
  );
};

export default Post;
