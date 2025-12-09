// DOM элементы
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const quoteCategory = document.getElementById('quoteCategory');
const getRandomBtn = document.getElementById('getRandomBtn');
const getProgrammingBtn = document.getElementById('getProgrammingBtn');
const apiResponse = document.getElementById('apiResponse');

// Базовая функция для запросов к API
async function fetchAPI(url, options = {}) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка:', error);
        return { error: 'Не удалось получить данные' };
    }
}

// Получить случайную цитату
async function getRandomQuote() {
    const data = await fetchAPI('/api/quotes/random');

    if (data.error) {
        quoteText.textContent = 'Ошибка при загрузке цитаты';
        quoteAuthor.textContent = '—';
        quoteCategory.textContent = 'ошибка';
        return;
    }

    quoteText.textContent = `"${data.text}"`;
    quoteAuthor.textContent = `— ${data.author}`;
    quoteCategory.textContent = data.category;
}

// Получить случайную цитату о программировании
async function getProgrammingQuote() {
    const data = await fetchAPI('/api/quotes/category/программирование');

    if (data.error || data.count === 0) {
        quoteText.textContent = 'Нет цитат по программированию';
        quoteAuthor.textContent = '—';
        quoteCategory.textContent = 'программирование';
        return;
    }

    const randomIndex = Math.floor(Math.random() * data.quotes.length);
    const quote = data.quotes[randomIndex];

    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
    quoteCategory.textContent = quote.category;
}

// Получить все цитаты (для тестирования API)
async function fetchAllQuotes() {
    const data = await fetchAPI('/api/quotes');
    apiResponse.textContent = JSON.stringify(data, null, 2);
}

// Получить цитаты по категории
async function fetchByCategory(category) {
    const data = await fetchAPI(`/api/quotes/category/${category}`);
    apiResponse.textContent = JSON.stringify(data, null, 2);
}

// Поиск цитат
async function searchQuotes(query) {
    const data = await fetchAPI(`/api/quotes/search?q=${encodeURIComponent(query)}`);
    apiResponse.textContent = JSON.stringify(data, null, 2);
}

// Обработчики событий
getRandomBtn.addEventListener('click', getRandomQuote);
getProgrammingBtn.addEventListener('click', getProgrammingQuote);

// Загрузить случайную цитату при загрузке страницы
window.addEventListener('DOMContentLoaded', getRandomQuote);

// Пример POST запроса (для демонстрации)
async function addExampleQuote() {
    const newQuote = {
        text: "Это тестовая цитата, добавленная через API",
        author: "Тестовый Автор",
        category: "тест",
        year: 2024
    };

    const data = await fetchAPI('/api/quotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuote)
    });

    console.log('Добавлена цитата:', data);
}

// Вывести в консоль доступные функции
console.log('Доступные функции:');
console.log('- getRandomQuote() - получить случайную цитату');
console.log('- getProgrammingQuote() - получить цитату о программировании');
console.log('- fetchAllQuotes() - получить все цитаты');
console.log('- fetchByCategory("мотивация") - получить цитаты по категории');
console.log('- searchQuotes("код") - поиск цитат');
console.log('- addExampleQuote() - добавить тестовую цитату');