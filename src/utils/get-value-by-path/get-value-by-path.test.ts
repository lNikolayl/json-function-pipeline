import { getValueByPath } from "./get-value-by-path";

describe("[util] get-value-by-path", () => {
  test("should return value", () => {
    const data = new Map([["key", "value"]]);
    const value = getValueByPath(data, "key");

    expect(value).toBe("value");
  });

  test("should return value from array", () => {
    const data = new Map([["key", ["value1", "value2"]]]);
    const value = getValueByPath(data, "key[1]");

    expect(value).toBe("value2");
  });

  test("should return array", () => {
    const data = new Map([["key", ["value1", "value2"]]]);
    const value = getValueByPath(data, "key");

    expect(value).toEqual(["value1", "value2"]);
  });

  test("should throw argument error", () => {
    const data = new Map([["key", ["value1", "value2"]]]);

    expect(() => getValueByPath(data, "")).toThrow(
      "Not correct argument path: ",
    );
  });

  test("should throw no argument", () => {
    const data = new Map([["key", ["value1", "value2"]]]);

    expect(() => getValueByPath(data, "another-key")).toThrow(
      "There is no saved argument with name another-key",
    );
  });
});
