import React from "react";

import "./CommentList.css";

export default ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;
    if (comment.status === "Rejected") {
      content = "[[Rejected]]";
    }
    if (comment.status === "Approved") {
      content = comment.content;
    }
    if (comment.status === "Pending") {
      content = "Comment requires approval";
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul className="CommentList">{renderedComments}</ul>;
};
