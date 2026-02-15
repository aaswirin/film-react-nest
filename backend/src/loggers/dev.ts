/**
 * Модуль для "Логгер для людей"
 */

import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class DevLogger extends ConsoleLogger {}
