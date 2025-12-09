// Middleware для логирования всех входящих запросов
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip || req.connection.remoteAddress;

    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);

    // Добавляем время начала обработки запроса
    req.startTime = Date.now();

    // Логируем завершение запроса
    res.on('finish', () => {
        const duration = Date.now() - req.startTime;
        console.log(`[${timestamp}] Завершено за ${duration}ms - статус: ${res.statusCode}`);
    });

    next();
};

module.exports = requestLogger;