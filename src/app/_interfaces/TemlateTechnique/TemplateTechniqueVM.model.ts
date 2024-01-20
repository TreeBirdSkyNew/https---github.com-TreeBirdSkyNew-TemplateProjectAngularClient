import { TemplateTechniqueItemVM } from "./TemplateTechniqueItem/TemplateTechniqueItemVM.model";

export interface TemplateTechniqueVM{
    templateTechniqueId: BigInteger;
    templateProjectId: BigInteger;
    templateTechniqueName: string;
    templateTechniqueTitle: string;
    templateTechniqueDescription: string;
    templateTechniqueVersion: string;
    templateTechniqueVersionNet: string;
    templateTechniqueItem?: TemplateTechniqueItemVM[];
  }