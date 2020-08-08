import React from 'react';

const Card = ({ lesson }) => {
  return (
    <div className="card">
      <img src={lessong.image} alt={lesson.short} />
      <div className="content">
        <h2>{lesson.title}</h2>
        <span>BY: {lesson.author}</span>
      </div>
    </div>
  );
};

export default Card;
