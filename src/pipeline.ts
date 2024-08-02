import { PipelineItem } from "./types";
import { processPipelineItem } from "./utils/process-pipeline-item";

export class JsonPipeline {
  private dictionary: Record<string, unknown>;

  constructor(dictionary: Record<string, unknown>) {
    if (Object.isFrozen(dictionary)) {
      throw new Error("Dictionary should be mutable");
    }
    this.dictionary = dictionary;
  }

  apply(pipeline: PipelineItem[]) {
    return pipeline.reduce((_, item) => {
      const result = processPipelineItem(item, this.dictionary);

      if (item.saveTo && typeof item.saveTo === "string") {
        this.dictionary[item.saveTo] = result;
      }

      return result;
    }, undefined as unknown);
  }
}
