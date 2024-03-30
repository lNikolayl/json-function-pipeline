import { PipelineItem } from "../../types";
import { processPipelineItem } from "./process-pipeline-item";

const SOME_VALUE = "some-value";

describe("[util] process-pipeline-item", () => {
  const vars = {
    varNumber: 1,
    returnVar: (arg: number) => arg,
    returnConst: () => SOME_VALUE,
  };

  test("should return value from dictionary", () => {
    const map = new Map(Object.entries(vars));
    const item: PipelineItem = {
      functionNameToCall: "returnVar",
      functionArgs: ["$varNumber"],
    };
    const value = processPipelineItem(item, map);

    expect(value).toBe(vars.varNumber);
  });

  test("should return string value", () => {
    const map = new Map(Object.entries(vars));
    const item: PipelineItem = {
      functionNameToCall: "returnVar",
      functionArgs: ["some-value"],
    };
    const value = processPipelineItem(item, map);

    expect(value).toBe("some-value");
  });

  test("should return boolean value", () => {
    const map = new Map(Object.entries(vars));
    const item: PipelineItem = {
      functionNameToCall: "returnVar",
      functionArgs: [true],
    };
    const value = processPipelineItem(item, map);

    expect(value).toBe(true);
  });

  test("should call function without arguments", () => {
    const map = new Map(Object.entries(vars));
    const item: PipelineItem = {
      functionNameToCall: "returnConst",
    };
    const value = processPipelineItem(item, map);

    expect(value).toBe(SOME_VALUE);
  });

  test("should throw function error", () => {
    const map = new Map(Object.entries(vars));
    const item: PipelineItem = {
      functionNameToCall: "varNumber",
      functionArgs: ["$varNumber"],
    };

    expect(() => processPipelineItem(item, map)).toThrow(
      "varNumber is not a function",
    );
  });
});
