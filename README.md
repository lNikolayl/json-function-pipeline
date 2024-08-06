<div align='center'>

<h1>json-function-pipeline</h1>

</div>

## Install

```bash
$ npm install json-function-pipeline --save
```

## Overview

json-function-pipeline is designed to allow describe the sequence of functions through JSON. The idea is to apply this library for Server Driven UI projects. It can be used as a simple tool to build up complex pipeline based on JSON structure.

## Usage

The main idea of this library is fully customizable functions sequence. In `JsonPipeline` constructor you can provide `key: value` mapping. You can use keys of this mapping as reference to extract the value in the pipeline structure. The value could be any type that you want: string, boolean, object or number.

### Simple example

In the example below variable `dictionary` has two fields:

- `log` logging function
- `variable` some string

`pipeline` is an array of objects where

- `functionNameToCall` name of the function to call
- `functionArgs` (optional) list of arguments that should be passed to the called function
- `saveTo` (optiona) name of the field where funtion result should be stored

To refer to the value from the `dictionary` you can use `$` symbol otherwise it would be interpreted as string value.

```ts
import { JsonPipeline } from "json-function-pipeline";

const dictionary = {
  log: console.log,
  sum: (a, b) => a + b,
  variable: "value",
};

const pipeline = [
  { functionNameToCall: "log", functionArgs: ["$variable"] },
  { functionNameToCall: "sum", saveTo: "sumResult", functionArgs: [1, 2] },
];

const jsonPipeLine = new JsonPipeline(dictionary);

const resultData = jsonPipeLine.apply(pipeline);

consolw.log(resultData.sumResult);
```

`pipeline` is an array of items with function name and arguments.
`dictionary` is a mapping of pipeline variables.

Input dictionary shuld be full muatybel object. During the pipeline some function could change or add propertioes to this record.
