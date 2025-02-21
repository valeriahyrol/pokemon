/**
 * Створюємо екземпляр додатку Express.
 * Зауваження: використовується простий об'єкт, але його можна трактувати як Express додаток.
 *
 * @type {Object}
 */
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');



/**
 * Додаємо middleware для вирішення CORS-проблем.
 */
app.use(cors());

/**
 * Порт, на якому запускається сервер.
 * @constant {number}
 */
const PORT = process.env.PORT || 5001;

/**
 * Базова адреса для звернень до PokeAPI.
 * @constant {string}
 */
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Отримує список покемонів із підтримкою пагінації.
 *
 * @name GET /api/pokemon
 * @function
 * @param {number} [req.query.page=1] - Номер сторінки.
 * @param {number} [req.query.limit=12] - Кількість покемонів на сторінку.
 * @returns {Object[]} Повертає список покемонів із детальною інформацією.
 *
 * @example
 * // Запит для отримання першої сторінки з 12 покемонів
 * GET /api/pokemon?page=1&limit=12
 */
app.get('/api/pokemon', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    try {
        const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
        const results = response.data.results;

        // Отримуємо детальну інформацію про кожного покемона
        const pokemonDetails = await Promise.all(
            results.map(async (poke) => {
                try {
                    const pokeResponse = await axios.get(poke.url);
                    return pokeResponse.data;
                } catch (error) {
                    console.error(`Error fetching details for ${poke.name}:`, error.message);
                    return null;
                }
            })
        );

        // Фільтруємо невдалі запити
        res.json(pokemonDetails.filter(item => item !== null));
    } catch (error) {
        console.error('Error fetching Pokémon list:', error.message);
        res.status(500).json({ error: 'Error fetching Pokémon list' });
    }
});

/**
 * Отримує детальну інформацію про конкретного покемона.
 *
 * @name GET /api/pokemon/:id
 * @function
 * @param {string|number} req.params.id - Ідентифікатор або ім'я покемона.
 * @returns {Object} Об'єкт з детальною інформацією про покемона.
 *
 * @example
 * // Запит для отримання деталей про покемона з id=1 (Bulbasaur)
 * GET /api/pokemon/1
 */
app.get('/api/pokemon/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching Pokémon details:', error.message);
        res.status(500).json({ error: 'Error fetching Pokémon details' });
    }
});

/**
 * Запускає сервер на заданому порту.
 * @function
 * @example
 * // Запуск сервера
 * node server.js
 */

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
