"use client";

import type { Lang } from "@/lib/concierge/types";

type SpeechResultEvent = {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

export default function VoiceButton({
  lang,
  onText,
}: {
  lang: Lang;
  onText: (value: string) => void;
}) {
  function start() {
    if (typeof window === "undefined") return;

    const speechWindow = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };

    const Recognition =
      speechWindow.SpeechRecognition ||
      speechWindow.webkitSpeechRecognition;

    if (!Recognition) {
      window.alert("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new Recognition();
    recognition.lang = lang === "hi" ? "hi-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const text = event.results[0]?.[0]?.transcript || "";
      if (text) onText(text);
    };

    recognition.onend = () => undefined;
    recognition.start();
  }

  return (
    <button
      type="button"
      onClick={start}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#4a3025]/10 bg-white"
      aria-label="Voice input"
    >
      🎙
    </button>
  );
}
