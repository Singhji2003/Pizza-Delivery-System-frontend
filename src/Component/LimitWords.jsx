import React from 'react';

function LimitWords({ text, limit }) {
  const words = text.split(' ');

  if (words.length > limit) {
    const limitedText = words.slice(0, limit).join(' ');
    return <span>{limitedText}...</span>;
  }

  return <span>{text}</span>;
}

export default LimitWords;
