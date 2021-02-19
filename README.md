# Web Speech APIとGCP Natural Language APIを使用した,発言の感情分析

## 使い方

1. [https://cloud.google.com/natural-language/docs/setup?hl=ja](https://cloud.google.com/natural-language/docs/setup?hl=ja)を参考に,Google Cloud SDKおよび,Natural Language APIが使用できるようにする.
2. [./server_node/app.ts](./server_node/app.js)をNode.jsで実行するか,[./server_go/app.go](./server_go/app.go)をコンパイルし実行してください.
3. [./public/index.html](./public/index.html)を開き,「start」ボタンを押して音声認識を開始します.認識された言葉は画面に表示されます.
4. 「stop」ボタンを押して音声認識を終了します.感情分析により,Positiveと判定された文章は緑,Negativeと判定された文章は赤で表示されます.

## 仕組み

### 音声認識
音声認識はJavaScriptのWeb Speech APIで実装されています.  
Web Speech APIはJavaScriptのみで,マイクからの入力の文字起こしを実現できます.  
使用するには次のようなJavaScriptを用意します.

```javascript
  const recognition = new SpeechRecognition(); // SpeechRecognitionオブジェクトを作成します.Chromeではwebkit接頭辞が必要です.
  recognition.lang = 'ja-JP'; // 認識する言語を指定します.デフォルトではHTMLのlang属性,または,ユーザーエージェントの言語設定が使用されています.
  recognition.continuous = false; // 継続的な認識結果を返すかどうかを指定します.
  recognition.interimResult = false; // 暫定的な認識結果を返すかどうかを指定します.

  // イベントハンドラーを設定し,認識結果を取得します.
  recognition.addEventListener('result', (e) => {
    console.log(e);
  });

  recognition.start(); // 音声認識の開始

  recognition.stop(); // 音声認識の終了
```

### 感情分析
感情分析には,GCPのNatural Language APIを使用します.  
入力された文章に対して,PositiveかNegativeか,またその環状の強度を推測します.  
各種言語でライブラリが用意されています.  
本プログラムでは,Node.jsとExpress,または,GoとGinを使用してサーバを用意し,「/api/v1/sentiment」へのGETリクエストからクエリパラメータ「text」を入力として受け取り,分析結果をレスポンスとしてJSON形式で返します.  
コードの詳細は各ファイルから確認してください.