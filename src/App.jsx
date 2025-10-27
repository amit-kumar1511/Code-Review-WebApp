import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Editor from '@monaco-editor/react';
import Select from 'react-select'
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown'
import HashLoader from 'react-spinners/HashLoader'


const App = () => {
  
const darkThemeStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: '#18181b', // zinc-900
    borderColor: '#27272a', // zinc-800
    color: '#fff',
    boxShadow: 'none',
    '&:hover': { borderColor: '#3f3f46' }, // zinc-700
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#27272a', // zinc-800
    color: '#fff',
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected
      ? '#3f3f46' // zinc-700
      : isFocused
      ? '#52525b' // zinc-600 hover
      : '#27272a', // zinc-800 default
    color: '#fff',
    cursor: 'pointer',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#fff',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#a1a1aa', // zinc-400
  }),
};
   const options = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'php', label: 'PHP' },
  { value: 'swift', label: 'Swift' },
  { value: 'go', label: 'Go' },
  { value: 'ruby', label: 'Ruby' },
];

    const [selectedOption,setSelectedOption] = useState(options[0]);
    const [code , setCode] = useState("")

    const ai = new GoogleGenAI({apiKey:"AIzaSyAIYNyQmieJ5Xz2l9PaVviL2yONKxTVDcU"});
    const [loading , setLoading] = useState(false);
    const [response , setResponse] = useState("")
    
  async function reviewCode() {
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
        contents: `You are an expert-level code reviewer.

When reviewing code, respond ONLY in this exact short format (max 10 lines):

❌ Bad Code:
\`\`\`javascript
// incorrect code here
\`\`\`

💡 Issues:
* Short bullet points (max 2).

✅ Recommended Fix:
\`\`\`javascript 
// corrected code here
\`\`\`

💡 Improvements / Additional Notes:
* Short bullet points (max 2).

Language: ${selectedOption.value}
Code to review:
${code}`,
    });
    console.log(response.text);
    setResponse(response.text)
    setLoading(false);
  }
  return (
    <div>
  <Navbar />
  <div
    className="main flex items-start justify-between gap-4 p-4"
    style={{ marginTop: "15px" }}
  >
    {/* LEFT SIDE */}
    <div className="left w-1/2 flex flex-col">
      <div className="flex items-center justify-between !mb-3">
        <div className="flex items-center gap-90">
          <Select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e)}
            options={options}
            styles={darkThemeStyles}
            className="w-64 text-sm"
          />
          <button onClick={()=>{
            if(code === "" ){
              alert("please enter code first")
            }else {
              reviewCode()
            }

          
          }}
          

          
          className="btnNormal bg-zinc-900 px-4 py-2 rounded text-white">
            Review
          </button>
        </div>
      </div>

      <div className="flex-1 border border-zinc-700 rounded overflow-hidden">
        <Editor
          theme="vs-dark"
          height="76vh" 
          language={selectedOption.value}
          value={code}
          onChange={(e)=>{setCode(e)}}
        />
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="right w-[49%] flex flex-col justify-start items-center">
      <button className="btnNormal bg-zinc-900 text-white px-4 py-2 rounded self-end !mb-3 ">
       Response</button>
      <div className="heading w-[96%] h-[76vh] bg-zinc-900 rounded !p-3 !overflow-scroll  ">
        {loading && <HashLoader /> }
        <Markdown>{response}</Markdown></div>
    </div>
  </div>
</div>

  )
}

export default App