import { JsonPipeline } from "./pipeline";
import { PipelineItem } from "./types";

describe("[class] JsonPipeline", () => {
  const vars = {
    varNumber: 1,
    varString: "some-string",
    returnVar: (arg: number) => arg,
  };

  const jsonPipeline = new JsonPipeline(vars);

  test("should return last function result", () => {
    const pipeline: PipelineItem[] = [
      { functionNameToCall: "returnVar", functionArgs: ["$varNumber"] },
      { functionNameToCall: "returnVar", functionArgs: ["$varString"] },
    ];

    const pipelineResult = jsonPipeline.applyPipeline(pipeline);

    expect(pipelineResult).toBe(vars.varString);
  });
});
