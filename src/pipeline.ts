import { CURRENT_VALUE } from "./constants";
import { PipelineItem } from "./types";
import { processPipelineItem } from "./utils/process-pipeline-item";

export class JsonPipeline {
  private dictionary: Record<string, unknown>;

  constructor(dictionary: Record<string, unknown>) {
    this.dictionary = dictionary;
  }

  applyPipeline(pipeline: PipelineItem[]) {
    const savedVariablesMap: Map<string, unknown> = new Map(
      Object.entries(this.dictionary),
    );
    return pipeline.reduce((currentValue, item) => {
      savedVariablesMap.set(CURRENT_VALUE, currentValue);

      const result = processPipelineItem(item, savedVariablesMap);

      if (item.saveTo && typeof item.saveTo === "string") {
        savedVariablesMap.set(item.saveTo, result);
      }

      return result;
    }, undefined as unknown);
  }
}
