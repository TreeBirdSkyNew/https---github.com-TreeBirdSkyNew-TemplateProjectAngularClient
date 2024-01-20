import { NodeChildVM } from "./NodeChildVM";

export interface RootVM{
    nodeId: string;
    nodeText: string;
    nodeChild: NodeChildVM[]
  }