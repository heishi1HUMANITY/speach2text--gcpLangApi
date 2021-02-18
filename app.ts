'use strict';
import * as language from '@google-cloud/language';
const express = require('express');
const cors = require('cors');

const client: language.v1.LanguageServiceClient = new language.LanguageServiceClient();
const app = express();

app.use(cors());

app.get('/api/v1/sentiment', async (req, res) => {
  const text = req.query.text;
  const document: language.protos.google.cloud.language.v1.IDocument = {
    content: text,
    type: 'PLAIN_TEXT'
  };
  try {
    const [result] = await client.analyzeSentiment({ document: document });
    res.json({ result: result.sentences });
  } catch (err) {
    res.status(500)
    res.json({ err: err })
  }
});

app.listen(8080, () => console.log(':8080'));
