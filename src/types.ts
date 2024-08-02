export type PipelineItem = {
  functionNameToCall: string;
  saveTo?: string;
  functionArgs?: (string | number | boolean | object)[];
};
