// LoggingMiddleware.js

class LoggingMiddleware {
  constructor(config = {}) {
    this.serviceName = config.serviceName || 'URLShortener';
    this.environment = config.environment || 'development';
    this.enableConsole = config.enableConsole || false;
    this.logs = [];
  }

  log(level, message, data = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      service: this.serviceName,
      environment: this.environment,
      message,
      data,
      sessionId: this.getSessionId(),
      requestId: this.generateRequestId()
    };

    this.logs.push(logEntry);
    this.processLog(logEntry);
  }

  info(message, data = {}) {
    this.log('info', message, data);
  }

  error(message, data = {}) {
    this.log('error', message, data);
  }

  warn(message, data = {}) {
    this.log('warn', message, data);
  }

  processLog(logEntry) {
    if (this.enableConsole) {
      console.log(
        `[${logEntry.timestamp}] ${logEntry.level}: ${logEntry.message}`,
        logEntry.data
      );
    }
  }

  getSessionId() {
    if (typeof window === 'undefined' || !window.sessionStorage) return 'unknown-session';
    let sessionId = window.sessionStorage.getItem('logging-session-id');
    if (!sessionId) {
      sessionId =
        'sess-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      window.sessionStorage.setItem('logging-session-id', sessionId);
    }
    return sessionId;
  }

  generateRequestId() {
    return 'req-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  getLogs() {
    return this.logs;
  }
}

export default LoggingMiddleware;