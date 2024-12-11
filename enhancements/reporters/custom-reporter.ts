import type {
  Reporter, FullConfig, Suite, TestCase, TestResult, FullResult
} from '@playwright/test/reporter';

import {filterObjectDeep} from './utils/obj'

type ReporterOptions = {
  environment?: 'local' | 'remote'
}

// console.log(import.meta.dir);
const TESTS = new Map();
let environment;

class MyReporter implements Reporter {
  constructor(options: ReporterOptions) {
    console.log(`custom-reporter setup with environment set to ${options.environment}`);
    environment = options.environment;
  }

  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
    // console.log(suite);
  }

  onTestBegin(test: TestCase) {
    console.log(`Starting test ${test.title}`);
    // console.log(test);
    let data = {
      id: test.id,
      title: test.title,
      type: test.type,
      spec: test.parent.title,
      project: test.parent.parent?.title,
      status: 'pending',
      environment,
      // retry: obj.retry,
      // parallelIndex: obj.parallelIndex,
      // workerIndex: obj.workerIndex,
      // duration: obj.duration,
      // startTime: obj.startTime,
      // status: obj.status,
    };
    console.log(data);
    TESTS.set(data.id, data);

  }

  onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Finished test ${test.title}: ${result.status}`);
    // console.log(test);
    let obj = filterObjectDeep(result);

    // let projectPath = __dirname.slice(0, -10);

    let data = {
      id: test.id,
      title: test.title,
      type: test.type,
      spec: test.parent.title,
      project: test.parent.parent?.title,

      retry: obj.retry,
      parallelIndex: obj.parallelIndex,
      workerIndex: obj.workerIndex,
      duration: obj.duration,
      startTime: obj.startTime,
      status: obj.status,
      environment,
      // errors: obj.errors,

      // location: test.location,
      // parent: {
      //   title: test.parent.title,
      // },
      // ...obj,
    };
    console.log('------ TEST END --------');
    console.log(JSON.stringify(data, null, 4));
    TESTS.set(data.id, data);
    // console.log(obj.errors);
    // console.log(obj.errors);
    // if(result==null || result.error == null) return;
    // Bun.write('./reports/test.json', JSON.stringify(obj, null, 4));
    // console.log(result);
  }

  onEnd(result: FullResult) {
    console.log(`Finished the run: ${result.status}`);
    console.log(TESTS);
  }
}
export default MyReporter;