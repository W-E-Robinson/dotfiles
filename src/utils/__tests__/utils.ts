import { promisify } from 'util';
import { readFile, mkdir, writeFile, rm, rmdir } from 'fs';

import { repoTopLevel } from '../index';

const readFileAsync = promisify(readFile);
const mkdirAsync = promisify(mkdir);
const writeFileAsync = promisify(writeFile);
const rmAsync = promisify(rm);
const rmdirAsync = promisify(rmdir);

export const createTestDotfiles = (): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const utilsTestFolderPath = await repoTopLevel('/src/utils/__tests__/');
      const testRepoDotfileData = await readFileAsync(utilsTestFolderPath + 'fixtures/.sampleRepoDotfile', 'utf8');
      const testSameUserDotfileData = await readFileAsync(utilsTestFolderPath + 'fixtures/.sampleSameUserDotfile', 'utf8');
      const testDifferentUserDotfileData = await readFileAsync(utilsTestFolderPath + 'fixtures/.sampleDifferentUserDotfile', 'utf8');

      const utilsTempFixturesFolderPath = utilsTestFolderPath + 'tempFixtures/';
      await mkdirAsync(utilsTempFixturesFolderPath);
      await writeFileAsync(utilsTempFixturesFolderPath + '.sampleRepoDotfile', testRepoDotfileData);
      await writeFileAsync(utilsTempFixturesFolderPath + '.sampleSameUserDotfile', testSameUserDotfileData);
      await writeFileAsync(utilsTempFixturesFolderPath + '.sampleDifferentUserDotfile', testDifferentUserDotfileData);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const removeTestDotfiles = (): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const utilsTempFixturesFolderPath = await repoTopLevel('/src/utils/__tests__/tempFixtures/');

      await rmAsync(utilsTempFixturesFolderPath + '.sampleRepoDotfile');
      await rmAsync(utilsTempFixturesFolderPath + '.sampleSameUserDotfile');
      await rmAsync(utilsTempFixturesFolderPath + '.sampleDifferentUserDotfile');
      await rmdirAsync(utilsTempFixturesFolderPath);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
