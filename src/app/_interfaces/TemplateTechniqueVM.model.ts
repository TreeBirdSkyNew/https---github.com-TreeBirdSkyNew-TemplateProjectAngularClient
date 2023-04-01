import { TemplateTechniqueItemVM } from "./TemplateTechniqueItemVM.model";

export interface TemplateTechniqueVM{
    templateTechniqueId: BigInteger;
    templateProjectId: BigInteger;
    templateTechniqueName: string;
    templateTechniqueTitle: string;
    templateTechniqueDescription: string;
    templateTechniqueVersion: string;
    templateTechniqueVersionNET: string;
    templateTechniqueItem?: TemplateTechniqueItemVM[];
  }