'use client'
import React, { useState } from 'react';
import axios from 'axios';

const TextSummarizer = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const wordCount = inputText.trim().split(/\s+/).length;

    if (wordCount < 50) {
      setError('Input text must be at least 50 words.');
      return;
    }

    setError('');

    try {
      const response = await axios.post('http://localhost:5000/summarize', { text: inputText }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSummary(response.data.summary);
    } catch (err) {
      setError('An error occurred while summarizing the text.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Text Summarizer</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <textarea
          value={inputText}
          onChange={handleChange}
          placeholder="Paste ypur news article here"
          rows="10"
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Summarize
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {summary && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="p-4 border border-gray-300 rounded bg-gray-50 text-black">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default TextSummarizer;
