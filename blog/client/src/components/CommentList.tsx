import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  postID: string;
}

interface Comment {
  id: string;
  content: string;
}

const CommentList: React.FC<Props> = ({ postID }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postID}/comments`
    );
    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

export default CommentList;
