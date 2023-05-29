const booksModel = require('../model/BooksModel');

/** show all books */
const showAll = (req, res) => {
    let httpResponse = {
        status: null,
        data: {
            books: [],
        }
    };

    let statusCode,
        statusMessage,
        responseMessage;

    try {
        statusCode = 200;
        statusMessage = 'success';
        responseMessage = 'OK';

        httpResponse.status = statusMessage;
        httpResponse.data.books = booksModel.show();
    } catch (error) {
        console.log(error);

        statusCode = 500;
        statusMessage = 'fail';
        responseMessage = 'Internal Server Error';

        httpResponse.status = statusMessage;
        httpResponse.message = responseMessage;
    }

    return res.response(httpResponse).code(statusCode);
};

/** show book by ID */
const showById = (req, res) => {
    let httpResponse = {
        status: null,
        data: {
            books: {},
        }
    };

    let statusCode,
        statusMessage,
        responseMessage;

    try {
        statusCode = 200;
        statusMessage = 'success';
        responseMessage = 'OK';

        httpResponse.status = statusMessage;
        // httpResponse.data.books = booksModel.showById();
    } catch (error) {
        console.log(error);

        statusCode = 500;
        statusMessage = 'fail';
        responseMessage = 'Internal Server Error';

        httpResponse.status = statusMessage;
        httpResponse.message = responseMessage;
    }

    return res.response(httpResponse).code(statusCode);
};

/** create a new book */
const store = (req, res) => {
    let httpResponse = {
        status: null,
        message: null,
    };

    let statusCode,
        statusMessage,
        responseMessage;

    try {
        statusCode = 200;
        statusMessage = 'success';
        responseMessage = 'OK';

        httpResponse.status = statusMessage;
        httpResponse.request = req.payload;
    } catch (error) {
        console.log(error);

        statusCode = 500;
        statusMessage = 'fail';
        responseMessage = 'Internal Server Error';

        httpResponse.status = statusMessage;
        httpResponse.message = responseMessage;
    }

    return res.response(httpResponse).code(statusCode);
};

/** update book */
const update = (req, res) => {
    let httpResponse = {
        status: null,
        message: null,
    };

    let statusCode,
        statusMessage,
        responseMessage;

    try {
        statusCode = 200;
        statusMessage = 'success';
        responseMessage = 'OK';

        httpResponse.status = statusMessage;
        httpResponse.request = req.payload;
    } catch (error) {
        console.log(error);

        statusCode = 500;
        statusMessage = 'fail';
        responseMessage = 'Internal Server Error';

        httpResponse.status = statusMessage;
        httpResponse.message = responseMessage;
    }

    return res.response(httpResponse).code(statusCode);
};

/** delete book */
const destroy = (req, res) => {
    let httpResponse = {
        status: null,
        message: null,
    };

    let statusCode,
        statusMessage,
        responseMessage;

    try {
        statusCode = 200;
        statusMessage = 'success';
        responseMessage = 'OK';

        httpResponse.status = statusMessage;
        httpResponse.request = req.payload;
    } catch (error) {
        console.log(error);

        statusCode = 500;
        statusMessage = 'fail';
        responseMessage = 'Internal Server Error';

        httpResponse.status = statusMessage;
        httpResponse.message = responseMessage;
    }

    return res.response(httpResponse).code(statusCode);
};

module.exports = {
    showAll,
    showById,
    store,
    update,
    destroy
};