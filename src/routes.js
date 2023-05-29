const BooksController = require('./controller/BooksController');

const routes = [
    {
        method: 'GET',
        path: '/books/{id}',
        handler: (request, response) => {
            return BooksController.showById(request, response);
        },
    },
    {
        method: 'GET',
        path: '/books',
        handler: (request, response) => {
            return BooksController.showAll(request, response);
        },
    },
    {
        method: 'POST',
        path: '/books',
        handler: (request, response) => {
            return BooksController.store(request, response);
        },
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: (request, response) => {
            return BooksController.update(request, response);
        },
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: (request, response) => {
            return BooksController.destroy(request, response);
        },
    },
];

module.exports = routes;