import { BayesClassifier } from 'natural';

import type en from './en/responses.json';

type Responses = typeof en;

const doesIntentExist = (
  intent: string,
  responses: Responses,
): intent is keyof typeof responses => intent in responses;

const getIntent = (
  text: string,
  classifier: BayesClassifier,
  responses: Responses,
): keyof typeof responses | undefined => {
  const intent = classifier.classify(text);
  return doesIntentExist(intent, responses) ? intent : undefined;
};

interface GetReply {
  classifier: BayesClassifier;
  responses: Responses;
}

export function getReply(this: GetReply, text: string) {
  const intent = getIntent(text, this.classifier, this.responses);

  const responseOptions = this.responses[intent || 'fallback'];
  return responseOptions[Math.floor(Math.random() * responseOptions.length)];
}
