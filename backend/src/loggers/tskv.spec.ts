/**
 * Тесты для "Логгер для других машин"
 */

import { TskvLogger } from './tskv';

/**
 * Интерфейс для тестовых данных
 */
interface ITestData {
  message: any;
  optionalParam: any;
  additionalParam: any;
}

describe('Tskv Logger', () => {
  let logger: TskvLogger;
  let testLog: jest.SpyInstance;
  let testError: jest.SpyInstance;
  let testWarn: jest.SpyInstance;
  let testDebug: jest.SpyInstance;
  let testData: ITestData;

  beforeEach(async () => {
    logger = new TskvLogger();

    testLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    testError = jest.spyOn(console, 'error').mockImplementation(() => {});
    testWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    testDebug = jest.spyOn(console, 'debug').mockImplementation(() => {});

    // Тестовые данные
    testData = {
      message: 'Шеф, всё пропало, всё пропало! Гипс завтра снимают!',
      optionalParam: 'Бриллиантовая рука',
      additionalParam: 'Андрей Миронов',
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
      testData.optionalParam,
      testData.additionalParam,
    );

    expect(testLog).toHaveBeenCalledTimes(1);
    const string = testLog.mock.calls[0][0];
    expect(string).toBe(
      `level=log\tmessage=${testData.message}\toptionalParams=${testData.optionalParam},${testData.additionalParam}\n`,
    );
  });

  it('Уровень -> error', () => {
    logger.error(
      testData.message,
      testData.optionalParam,
      testData.additionalParam,
    );

    expect(testError).toHaveBeenCalledTimes(1);
    const string = testError.mock.calls[0][0];
    expect(string).toBe(
      `level=error\tmessage=${testData.message}\toptionalParams=${testData.optionalParam},${testData.additionalParam}\n`,
    );
  });

  it('Уровень -> warn', () => {
    logger.warn(
      testData.message,
      testData.optionalParam,
      testData.additionalParam,
    );

    expect(testWarn).toHaveBeenCalledTimes(1);
    const string = testWarn.mock.calls[0][0];
    expect(string).toBe(
      `level=warn\tmessage=${testData.message}\toptionalParams=${testData.optionalParam},${testData.additionalParam}\n`,
    );
  });

  it('Уровень -> debug', () => {
    logger.debug(
      testData.message,
      testData.optionalParam,
      testData.additionalParam,
    );

    expect(testDebug).toHaveBeenCalledTimes(1);
    const string = testDebug.mock.calls[0][0];
    expect(string).toBe(
      `level=debug\tmessage=${testData.message}\toptionalParams=${testData.optionalParam},${testData.additionalParam}\n`,
    );
  });
});
