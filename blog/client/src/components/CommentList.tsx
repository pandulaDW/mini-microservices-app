import React from "react";

interface Comment {
  id: string;
  content: string;
}

interface Props {
  comments: Comment[];
}

const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

export default CommentList;
