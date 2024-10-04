'use client'
import Editor from '@monaco-editor/react';
import { useState } from 'react';


const CodeReviewer = () => {
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState('');


  const handleReview = async () => {
    setError('');
    setReview('');
    try {
      const response = await fetch('/api/review/ai-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer example-token', // JWT와 같은 방식으로 사용자 인증 처리
        },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      if (response.ok) {
        setReview(data.review);
      } else {
        setError(data.error || 'An error occurred while fetching the review.');
      }
    } catch {
      setError('An error occurred while fetching the review.');
    }
  };

  
  return (
    <article className="w-full">
    <Editor
        height="300px"
        defaultLanguage="typescript"
        onChange={(value:string | undefined) => setCode(value || '')}
        theme="vs-dark"
      />
      <button
        onClick={handleReview}
        className="w-full bg-blue-500 text-white p-2 rounded mb-4 disabled:bg-gray-400"
      >
        Get Code Review
        </button>
      {review && <div className="review bg-green-100 p-2 rounded">{review}</div>}
      {error && <div className="error text-red-600 mt-2">{error}</div>}
    </article>
  );
};

export default CodeReviewer;