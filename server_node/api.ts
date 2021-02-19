'use strict'

import * as express from 'express';
import * as language from '@google-cloud/language';

export const api: express.Router = express.Router();
const client: language.v1.LanguageServiceClient = new language.LanguageServiceClient();

api.get('/sentiment', async (req: express.Request, res: express.Response): Promise<void> => {
  if (typeof req.query.text === 'string') {
    const text: string = req.query.text;
    const document: language.protos.google.cloud.language.v1.IDocument = {
      content: text,
      type: 'PLAIN_TEXT',
    };
    try {
      const [result] = await client.analyzeSentiment({ document: document });
      res.json({ result: result.sentences });
    } catch (err) {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
});
