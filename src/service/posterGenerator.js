import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const usePosterGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const generatePrompt = async (location, description) => {
    try {
      setIsLoading(true);
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const promptText = `Generate a detailed single paragraph prompt without pointers for stable diffusion to generate a NICE ILLUSTRATION PAINTING/ART for the given location and description. Location is ${location}. Description is ${description}.`;
      const result = await model.generateContent(promptText);
      const response = result.response;
      const text = response.text();
      setPrompt(text);
      console.log(text)
    } catch (error) {
      console.error("Error generating prompt:", error);
    }
  };

  const generatePoster = async () => {
    const apiKey = process.env.REACT_APP_RUNPOD_API_KEY;
    if (prompt) {
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: apiKey
        },
        body: JSON.stringify({
          input: {
            prompt,
            num_inference_steps: 25,
            refiner_inference_steps: 50,
            width: 1024,
            height: 1024,
            guidance_scale: 7.5,
            strength: 0.3,
            seed: null,
            num_images: 1
          }
        })
      };
      try {
        const response = await fetch('https://api.runpod.ai/v2/sdxl/runsync', options);
        const responseData = await response.json();
        console.log(responseData)
        setImageUrl(responseData.output.image_url)
      } catch (error) {
        console.error("Error generating poster:", error);
      }
      setIsLoading(false);
      setPrompt(""); // Clear prompt after generating the poster
    }
  };

  useEffect(() => {
    generatePoster();
  }, [prompt]);

  return { prompt, isLoading, imageUrl, generatePrompt, generatePoster };
};

export default usePosterGenerator;
