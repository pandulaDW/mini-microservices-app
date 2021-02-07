import React from "react";

interface Comment {
  id: string;
  content: string;
  status: "approved" | "pending" | "rejected";
}

interface Props {
  comments: Comment[];
}

const renderContent = (comment: Comment): string => {
  let content = comment.content;
  if (comment.status === "pending") content = "Awaiting moderation";
  if (comment.status === "rejected") content = "Rejected!!!";
  return content;
};

const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{renderContent(comment)}</li>
      ))}
    </ul>
  );
};

export default CommentList;
