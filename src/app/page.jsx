"use client";
import React, { useState } from "react";
import axios from "axios";
import { WavyBackground } from "./components/hero/page";
import Eng from "../app/components/sum/page"
const TextSummarizer = () => {
  const [inputText, setInputText] = useState("");
  const [engine, setEngine] = useState(false);

  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const wordCount = inputText.trim().split(/\s+/).length;

    if (wordCount < 50) {
      setError("Input text must be at least 50 words.");
      return;
    }

    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/summarize",
        { text: inputText },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSummary(response.data.summary);
    } catch (err) {
      setError("An error occurred while summarizing the text.");
      console.error(err);
    }
  };

  return engine ? (
    <Eng/>
  ) : (
    <div>
      <WavyBackground
        children={
          <div className="flex flex-col items-center">
            <span className="text-6xl font-bold">
              Briefly - The ultimate News summarizer
            </span>{" "}
            <br />
            <span className="text-xl">
              On an average it takes{" "}
              <span className="text-yellow-400 text-3xl m-1">6-8 min</span> to
              read 1 news article use our app and save upto{" "}
              <span className="text-green-400 text-3xl m-1">4min</span> on every
              article
            </span>
            <button
              onClick={() => setEngine(true)}
              className="top-[10vh] relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Use Briefly
              </span>
            </button>
          </div>
        }
        className="text-white"
      />
    </div>
  );
};

export default TextSummarizer;
