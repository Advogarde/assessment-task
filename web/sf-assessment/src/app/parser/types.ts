import { AbstractNode } from "../node/abstract-node";
import DataStore from "./data-store";

export interface Answer {
  id: string;
  text: string;
}

export interface ProcessNode {
  _id: string;
  node: AbstractNode;
  outputs: (string | null)[];
  answers: Answer[];
  start?: boolean;
}

export interface ChatMessage {
  id: string;
  content: any;
  associatedBlock?: {
    id: string;
    index: number;
  };
  responseRequest?: {
    response?: string;
    placeholder?: string;
  };
}

export interface Thread {
  /* Intrinsic attributes */
  chat: ChatMessage[];
  dataStore: DataStore;
  nodeTemplate:  ProcessNode[];
}

export class AbortExecutionError extends Error {}
