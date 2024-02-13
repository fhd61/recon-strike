import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import 'highlight.js/styles/night-owl.css';

// Register JSON language
hljs.registerLanguage('json', json);

// Function to perform highlighting
export const highlightJSON = (jsonString:string) => {
  // Ensure `hljs` is available and then highlight the code
  if(hljs) {
    const highlightedCode = hljs.highlight(jsonString, { language: 'json' }).value;
    return highlightedCode;
  }
  return jsonString; // Fallback to the original string if hljs is not initialized
};
