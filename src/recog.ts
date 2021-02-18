'use strict';

declare const webkitSpeechRecognition: typeof SpeechRecognition;

export const recognition: SpeechRecognition = new webkitSpeechRecognition();
recognition.lang = 'ja-JP';
recognition.continuous = true;
recognition.maxAlternatives = 1;
