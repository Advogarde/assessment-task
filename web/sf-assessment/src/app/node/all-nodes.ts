import { AbstractNode } from "./abstract-node";
import { PromptNode } from "./prompt-node";
import {SignatureNode} from "./signature-node";

/*
  * explanation:
  * new() => AbstractNode is a type of constructor function that returns an instance of AbstractNode
  * since an abstract class cannot be instantiated, this mean any class that extends AbstractNode
 */
export const allNodes: {[key: string]: new () => AbstractNode } = {
  PromptNode,
  SignatureNode,
};
