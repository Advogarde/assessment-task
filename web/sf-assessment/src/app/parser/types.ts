import { AbstractNode } from "../node/abstract-node";
import DataStore from "./data-store";

export interface ProcessNode {
  _id: string;
  node: AbstractNode;
  outputs: (string | null)[];
  start?: boolean;
  answer: any;
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
