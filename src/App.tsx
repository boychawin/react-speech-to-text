import "./App.css";
import { useState } from "react";
import SpeechRecognitionInput from "./components/speech-recognitionInput";

function App() {
  
  const [language, setLanguage] = useState<string>("th-TH");
  const [text, setText] = useState<string>("");
  const [text2, setText2] = useState<string>("");


  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <>
      <h1 className="heading">Speech to Text</h1>

      <select value={language} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="th-TH">Thai</option>
      </select>

      <div className="input_box">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <SpeechRecognitionInput
          setText={setText}
          language={language}
          isReset={true}
          isDownloadTranscript={true}
        />
      </div>

      <div className="input_box">
        <input
        id="2"
          type="text"
          value={text2}
          onChange={(e) => setText2(e.target.value)}
        />

        <SpeechRecognitionInput
          setText={setText2}
          language={language}
          isReset={false}
          isDownloadTranscript={false}
        />
      </div>



    </>
  );
}

export default App;
