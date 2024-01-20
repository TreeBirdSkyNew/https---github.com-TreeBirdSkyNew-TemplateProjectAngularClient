export interface TemplateTechniqueItemVMForUpdate{
    templateTechniqueId: BigInteger;
    templateTechniqueItemName: string;
    templateTechniqueItemTitle: string;
    templateTechniqueItemDescription: string;
    templateTechniqueItemVersion?: string;
    templateTechniqueItemVersionNet?: string;
    templateTechniqueInitialFile?: string;
    templateTechniqueFinalContent?: string;
  }