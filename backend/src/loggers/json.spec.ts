/**
 * Тесты для "Логгер для машин"
 */

import { JsonLogger } from './json';

/**
 * Интерфейс для тестовых данных
 */
interface ITestData {
  message: any;
  optionalParam1: any;
  optionalParam2: any;
}

describe('Json Logger', () => {
  let logger: JsonLogger;
  let testLog: jest.SpyInstance;
  let testError: jest.SpyInstance;
  let testWarn: jest.SpyInstance;
  let testDebug: jest.SpyInstance;
  let testData: ITestData;

  /**
   * Прелюдия
   */
  beforeEach(async () => {
    logger = new JsonLogger();

    testLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    testError = jest.spyOn(console, 'error').mockImplementation(() => {});
    testWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    testDebug = jest.spyOn(console, 'debug').mockImplementation(() => {});

    // Тестовые данные
    testData = {
      message: 'Шеф, всё пропало, всё пропало! Гипс завтра снимают!',
      optionalParam1: 'Бриллиантовая рука',
      optionalParam2: 'Андрей Миронов',
    };
  });

  /**
   * Прибраться за собой
   */
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Уровень -> log', () => {
    logger.log(
      testData.message,
      testData.optionalParam1,
      testData.optionalParam2,
    );

    expect(testLog).toHaveBeenCalledTimes(1);
    const callData = testLog.mock.calls[0][0];
    const parsed = JSON.parse(callData);
    expect(parsed.level).toBe('log');
    expect(parsed.message).toBe(testData.message);
    expect(parsed.optionalParams).toEqual([[
      testData.optionalParam1,
      testData.optionalParam2,
    ]]);
  });

  it('Уровень -> error', () => {
    logger.error(
      testData.message,
      testData.optionalParam1,
      testData.optionalParam2,
    );

    expect(testError).toHaveBeenCalledTimes(1);
    const callData = testError.mock.calls[0][0];
    const parsed = JSON.parse(callData);
    expect(parsed.level).toBe('error');
    expect(parsed.message).toBe(testData.message);
    expect(parsed.optionalParams).toEqual([
      testData.optionalParam1,
      testData.optionalParam2,
    ]);
  });

  it('Уровень -> warn', () => {
    logger.warn(
      testData.message,
      testData.optionalParam1,
      testData.optionalParam2,
    );

    expect(testWarn).toHaveBeenCalledTimes(1);
    const callData = testWarn.mock.calls[0][0];
    const parsed = JSON.parse(callData);
    expect(parsed.level).toBe('warn');
    expect(parsed.message).toBe(testData.message);
    expect(parsed.optionalParams).toEqual([
      testData.optionalParam1,
      testData.optionalParam2,
    ]);
  });

  it('Уровень -> debug', () => {
    logger.debug(
      testData.message,
      testData.optionalParam1,
      testData.optionalParam2,
    );

    expect(testDebug).toHaveBeenCalledTimes(1);
    const callData = testDebug.mock.calls[0][0];
    const parsed = JSON.parse(callData);
    expect(parsed.level).toBe('debug');
    expect(parsed.message).toBe(testData.message);
    expect(parsed.optionalParams).toEqual([
      testData.optionalParam1,
      testData.optionalParam2,
    ]);
  });
});
