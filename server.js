const express = require('express');
const path = require('path');
const quotesRouter = require('./routes/quotesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Пользовательский middleware (логирование запросов)
const requestLogger = require('./middleware/requestLogger');
app.use(requestLogger);

// Раздача статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Маршруты API
app.use('/api/quotes', quotesRouter);

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Обработка 404
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// Глобальная обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Что-то пошло не так!' });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
    console.log(`📁 Статические файлы доступны в /public`);
    console.log(`🔗 API доступно по /api/quotes`);
});