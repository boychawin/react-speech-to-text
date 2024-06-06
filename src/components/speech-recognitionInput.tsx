import React from "react";
import { TiMicrophoneOutline } from "react-icons/ti";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { IoStopCircleOutline } from "react-icons/io5";
import { MdLockReset } from "react-icons/md";
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

interface SpeechRecognitionInputProps {
  language: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  isReset: boolean;
  isDownloadTranscript: boolean;
}
const SpeechRecognitionInput: React.ForwardRefRenderFunction<HTMLButtonElement, SpeechRecognitionInputProps> = (
  { language, setText, isReset, isDownloadTranscript },
  ref
) => {

  const isListeningRef = React.useRef(false);

  const [isListening, setIsListening] = React.useState(false);

  const { transcript, listening, resetTranscript, isMicrophoneAvailable, browserSupportsSpeechRecognition } =
    useSpeechRecognition()

  if (!isMicrophoneAvailable) {
    return <span>The microphone is busy.</span>;
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const resetTranscripts = () => {
    resetTranscript();
    setText("");
  };

  const downloadTranscript = () => {
    const element = document.createElement("a");
    const file = new Blob([transcript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element);
    element.click();
  };

  React.useEffect(() => {
    if (transcript && isListeningRef.current) {
      setText(transcript);
    }
  }, [transcript]);


  React.useEffect(() => {

    if (isListeningRef.current) {
      setIsListening(listening)

      if(listening == false){
        handleStopListening()
      }
     
    }
  }, [listening]);



  const handleStartListening = () => {
    SpeechRecognition.startListening({
      continuous: false,
      interimResults: true,
      language
    });
    setIsListening(true);
    isListeningRef.current = true;
  };

  const handleStopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    isListeningRef.current = false;
  };



  return (
    <>
      <button
        ref={ref}
        onClick={isListening ? handleStopListening : handleStartListening}
        className="speak-button"
      >
        {isListening ? <IoStopCircleOutline size="15px" /> : <TiMicrophoneOutline size="15px" />}
      </button>
      {isDownloadTranscript && <button className="speak-button" onClick={downloadTranscript} aria-label="Download Transcript">
        <IoCloudDownloadOutline size="15px" />
      </button>}
      {isReset && <button className="speak-button" onClick={resetTranscripts} aria-label="Reset Transcript">
        <MdLockReset size="15px" />
      </button>}
    </>
  );
};

export default React.forwardRef(SpeechRecognitionInput);