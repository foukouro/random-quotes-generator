const quotesData = require('../data/quotes.json');

class QuotesController {
    // Получить все цитаты
    getAllQuotes(req, res) {
        // Поддержка query-параметра ?limit=
        const limit = req.query.limit;
        let quotes = [...quotesData];

        if (limit && !isNaN(limit)) {
            quotes = quotes.slice(0, parseInt(limit));
        }

        res.json({
            count: quotes.length,
            quotes: quotes
        });
    }

    // Получить случайную цитату
    getRandomQuote(req, res) {
        const randomIndex = Math.floor(Math.random() * quotesData.length);
        res.json(quotesData[randomIndex]);
    }

    // Получить цитату по ID
    getQuoteById(req, res) {
        const id = parseInt(req.params.id);
        const quote = quotesData.find(q => q.id === id);

        if (quote) {
            res.json(quote);
        } else {
            res.status(404).json({ error: 'Цитата не найдена' });
        }
    }

    // Фильтр по категории
    getQuotesByCategory(req, res) {
        const category = req.params.category.toLowerCase();
        const filteredQuotes = quotesData.filter(q =>
            q.category.toLowerCase() === category
        );

        res.json({
            category: category,
            count: filteredQuotes.length,
            quotes: filteredQuotes
        });
    }

    // Поиск по тексту
    searchQuotes(req, res) {
        const query = req.query.q;

        if (!query) {
            return res.status(400).json({ error: 'Не указан поисковый запрос' });
        }

        const searchResults = quotesData.filter(q =>
            q.text.toLowerCase().includes(query.toLowerCase()) ||
            q.author.toLowerCase().includes(query.toLowerCase())
        );

        res.json({
            query: query,
            count: searchResults.length,
            quotes: searchResults
        });
    }

    // Добавить новую цитату
    addQuote(req, res) {
        const { text, author, category, year } = req.body;

        if (!text || !author) {
            return res.status(400).json({
                error: 'Поля "text" и "author" обязательны'
            });
        }

        const newId = Math.max(...quotesData.map(q => q.id)) + 1;
        const newQuote = {
            id: newId,
            text: text,
            author: author,
            category: category || "разное",
            year: year || new Date().getFullYear()
        };

        // В реальном приложении здесь было бы сохранение в БД
        // quotesData.push(newQuote);

        res.status(201).json({
            message: 'Цитата добавлена',
            quote: newQuote
        });
    }

    // Обновить цитату
    updateQuote(req, res) {
        const id = parseInt(req.params.id);
        const quoteIndex = quotesData.findIndex(q => q.id === id);

        if (quoteIndex === -1) {
            return res.status(404).json({ error: 'Цитата не найдена' });
        }

        const updatedQuote = {
            ...quotesData[quoteIndex],
            ...req.body,
            id: id // Защищаем ID от изменения
        };

        // В реальном приложении: quotesData[quoteIndex] = updatedQuote;

        res.json({
            message: 'Цитата обновлена',
            quote: updatedQuote
        });
    }

    // Удалить цитату
    deleteQuote(req, res) {
        const id = parseInt(req.params.id);
        const quoteIndex = quotesData.findIndex(q => q.id === id);

        if (quoteIndex === -1) {
            return res.status(404).json({ error: 'Цитата не найдена' });
        }

        // В реальном приложении: quotesData.splice(quoteIndex, 1);

        res.json({
            message: 'Цитата удалена',
            deletedId: id
        });
    }
}

module.exports = new QuotesController();