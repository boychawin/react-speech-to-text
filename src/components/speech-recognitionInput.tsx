import React from "react";
import { TiMicrophoneOutline } from "react-icons/ti";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { IoStopCircleOutline } from "react-icons/io5";
import { MdLockReset } from "react-icons/md";
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";


interface SpeechRecognitionInputProps {
  language: string;
  setText: any;
  isReset: any;
  isDownloadTranscript: boolean;
}

const SpeechRecognitionInput: React.FC<SpeechRecognitionInputProps> = ({
  language,
  setText,
  isReset,
  isDownloadTranscript
}) => {




  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const downloadTranscript = () => {
    const element = document.createElement("a");
    const file = new Blob([transcript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element);
    element.click();
  };



  React.useEffect(() => {
    if (transcript) {
      setText(transcript)
    }
  }, [transcript])

  const [isListening, setIsListening] = React.useState(false);


  const handleStartListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, language });
  };

  const handleStopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };


  return (
    <>
      <button
        onClick={isListening ? handleStopListening : handleStartListening}
        className="speak-button"
      >
        {isListening ? <IoStopCircleOutline size="15px" /> : <TiMicrophoneOutline size="15px" />}
      </button>
      {isDownloadTranscript && <button className="speak-button" onClick={downloadTranscript} aria-label="Download Transcript">
        <IoCloudDownloadOutline size="15px" />
      </button>}
      {isReset && <button className="speak-button" onClick={resetTranscript} aria-label="Reset Transcript">
        <MdLockReset size="15px" />
      </button>}

    </>
  );
};

export default SpeechRecognitionInput;
