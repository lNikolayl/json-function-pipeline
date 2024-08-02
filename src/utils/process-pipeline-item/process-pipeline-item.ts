import { getValueByPath } from "../get-value-by-path";
import { PipelineItem } from "../../types";
import { isFunction } from "../is-function";
import { SPECIAL_START_CHAR } from "../../constants";

export const processPipelineItem = (
  pipelineItem: PipelineItem,
  dictionary: Record<string, unknown>,
) => {
  const functionToCall = getValueByPath(
    dictionary,
    pipelineItem.functionNameToCall,
  );

  if (!isFunction(functionToCall)) {
    throw new Error(`${pipelineItem.functionNameToCall} is not a function`);
  }

  const convertedArgs = pipelineItem.functionArgs?.map((arg) => {
    if (typeof arg !== "string") {
      return arg;
    }

    if (!arg.startsWith(SPECIAL_START_CHAR)) {
      return arg;
    }

    return getValueByPath(dictionary, arg.slice(1));
  });

  return convertedArgs ? functionToCall(...convertedArgs) : functionToCall();
};
