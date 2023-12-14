export interface TemplateTechniqueItemVMForCreation{
    templateTechniqueId: BigInteger;
    templateProjectId: BigInteger;
    templateTechniqueItemName: string;
    templateTechniqueItemTitle: string;
    templateTechniqueItemDescription: string;
    templateTechniqueItemVersion?: string;
    templateTechniqueItemVersionNET?: string;
    templateTechniqueInitialFile?: string;
    templateTechniqueFinalContent?: string;
  }