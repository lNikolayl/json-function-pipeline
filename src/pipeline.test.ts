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

  test("should save function result by saveTo field", () => {
    const pipeline: PipelineItem[] = [
      {
        functionNameToCall: "returnVar",
        saveTo: "strValue",
        functionArgs: ["$varString"],
      },
      { functionNameToCall: "returnVar", functionArgs: ["$strValue"] },
    ];

    const pipelineResult = jsonPipeline.applyPipeline(pipeline);

    expect(pipelineResult).toBe(vars.varString);
  });

  test("should mutate data in variable dictionary", () => {
    const data = {
      state: {
        field: "some-value",
      },
      mutate: (
        sourceObj: Record<string, unknown>,
        fieldName: string,
        value: unknown,
      ) => (sourceObj[fieldName] = value),
    };

    const jsonPipeline = new JsonPipeline(data);

    const pipeline: PipelineItem[] = [
      {
        functionNameToCall: "mutate",
        functionArgs: ["$state", "field", "newValue"],
      },
    ];

    jsonPipeline.applyPipeline(pipeline);

    expect(data.state.field).toBe("newValue");
  });
});
