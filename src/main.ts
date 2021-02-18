'use strict';

import { recognition } from './recog';

const button: HTMLButtonElement = document.querySelector('#recog');
const container: HTMLDivElement = document.querySelector('#container');

let recognitionStatus: Boolean = false;
let results: string[] = [];

recognition.addEventListener('result', (e: SpeechRecognitionEvent): void => {
  results.push(e.results[e.resultIndex][0].transcript);
  container.innerHTML = '';
  results.forEach((v: string): void => {
    const p = document.createElement('p');
    p.innerText = v + '。';
    container.appendChild(p);
  });
});

recognition.addEventListener('end', async (e: Event): Promise<void> => {
  const body: string = results.join('。');
  results = [];
  const uri: string = encodeURI(`http://localhost:8080/api/v1/sentiment?text=${body}`);
  try {
    const response: {result: any[]} = await fetch(uri).then((res: Response) => res.json());
    console.log(response)
    container.innerHTML = '';
    response.result.forEach((v: any): void => {
      const p = document.createElement('p');
      p.innerText = v.text.content.replace('。', '') + '。'
      if(v.sentiment.score <= -0.25) {
        p.setAttribute('style', 'color: red;');
      }else if(v.sentiment.score >= 0.25) {
        p.setAttribute('style', 'color: green;');
      }
      container.appendChild(p);
    });
  } catch (err) {
    console.log(err);
  }
});

button.addEventListener('click', (): void => {
  if (recognitionStatus === true) {
    recognition.stop();
    recognitionStatus = false;
    button.innerText = 'start'
  } else {
    recognition.start();
    recognitionStatus = true;
    button.innerText = 'stop';
    container.innerHTML = '';
  }
});
