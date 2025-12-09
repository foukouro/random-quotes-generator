const express = require('express');
const router = express.Router();
const quotesController = require('../controllers/quotesController');

// GET /api/quotes - все цитаты
router.get('/', quotesController.getAllQuotes);

// GET /api/quotes/random - случайная цитата
router.get('/random', quotesController.getRandomQuote);

// GET /api/quotes/:id - цитата по ID
router.get('/:id', quotesController.getQuoteById);

// GET /api/quotes/category/:category - фильтр по категории
router.get('/category/:category', quotesController.getQuotesByCategory);

// GET /api/quotes/search?q= - поиск по тексту
router.get('/search/search', quotesController.searchQuotes);

// POST /api/quotes - добавление новой цитаты
router.post('/', quotesController.addQuote);

// PUT /api/quotes/:id - обновление цитаты
router.put('/:id', quotesController.updateQuote);

// DELETE /api/quotes/:id - удаление цитаты
router.delete('/:id', quotesController.deleteQuote);

module.exports = router;