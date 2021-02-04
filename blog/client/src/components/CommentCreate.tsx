import React, { useState } from "react";
import axios from "axios";

interface Props {
  postID: string;
}

const CommentCreate: React.FC<Props> = ({ postID }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postID}/comments`, {
      content,
    });
    setContent("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="comment">New Comment</label>
        <input
          type="text"
          name="comment"
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default CommentCreate;
