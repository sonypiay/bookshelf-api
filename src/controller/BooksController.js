const booksModel = require('../model/BooksModel');
const { v4: uuidv4 } = require('uuid');

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

        const { reading, finished, name } = req.query;
        let books = booksModel.show();

        if( name && name != '' )
        {
            const queryName = new RegExp(`${name}`, 'gi');
            books = books.filter((item) => item.name.match(queryName));
        }
        
        if( reading && reading != '' )
        {
            const isReading = reading == '1' ? true : false;
            books = books.filter((item) => item.reading === isReading);
        }
        
        if( finished && reading != '' )
        {
            const isFinished = finished == '1' ? true : false;
            books = books.filter((item) => item.finished === isFinished);
        }

        books = books.map((item) => ({
            id: item.id,
            name: item.name,
            publisher: item.publisher,
        }));

        httpResponse.status = statusMessage;
        httpResponse.data.books = books;
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
            book: {},
        }
    };

    let statusCode,
        statusMessage,
        responseMessage;

    try {
        const id = req.params.id;
        const detailBook = booksModel.showById(id);

        statusCode = 200;
        statusMessage = 'success';
        responseMessage = 'OK';

        if( ! detailBook ) 
        {
            statusCode = 404;
            statusMessage = 'fail';
            responseMessage = 'Buku tidak ditemukan';
            httpResponse.message = responseMessage;
        }

        httpResponse.status = statusMessage;
        httpResponse.data.book = detailBook ?? {};
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
        const requestParams = {
            id: uuidv4(),
            name: req.payload.name,
            year: req.payload.year,
            author: req.payload.author,
            summary: req.payload.summary,
            publisher: req.payload.publisher,
            pageCount: req.payload.pageCount,
            readPage: req.payload.readPage,
            reading: req.payload.reading,
            finished: req.payload.pageCount === req.payload.readPage ? true : false,
            insertedAt: new Date().toISOString(),
            updatedAt: null,
        };

        if( ! requestParams.name || requestParams.name === undefined || requestParams.name === '' )
        {
            statusCode = 400;
            statusMessage = 'fail';
            responseMessage = 'Gagal menambahkan buku. Mohon isi nama buku';
        }
        else if( requestParams.readPage > requestParams.pageCount )
        {
            statusCode = 400;
            statusMessage = 'fail';
            responseMessage = 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount';
        }
        else
        {
            statusCode = 201;
            statusMessage = 'success';
            responseMessage = 'Buku berhasil ditambahkan';

            booksModel.create(requestParams);
        }

        httpResponse.status = statusMessage;
        httpResponse.message = responseMessage;

        if( statusCode == 201 ) httpResponse.data = {
            bookId: requestParams.id,
        };
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
        const id = req.params.id;
        const requestParams = {
            name: req.payload.name,
            year: req.payload.year,
            author: req.payload.author,
            summary: req.payload.summary,
            publisher: req.payload.publisher,
            pageCount: req.payload.pageCount,
            readPage: req.payload.readPage,
            reading: req.payload.reading,
            updatedAt: new Date().toISOString(),
        };

        if( ! requestParams.name || requestParams.name === undefined || requestParams.name === '' )
        {
            statusCode = 400;
            statusMessage = 'fail';
            responseMessage = 'Gagal memperbarui buku. Mohon isi nama buku';
        }
        else if( requestParams.readPage > requestParams.pageCount )
        {
            statusCode = 400;
            statusMessage = 'fail';
            responseMessage = 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount';
        }
        else
        {
            const isUpdated = booksModel.update( id, requestParams );

            statusCode = isUpdated ? 200 : 404;
            statusMessage = isUpdated ? 'success' : 'fail';
            responseMessage = isUpdated ? 'Buku berhasil diperbarui' : 'Gagal memperbarui buku. Id tidak ditemukan';
        }

        httpResponse.status = statusMessage;
        httpResponse.message = responseMessage;
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
        const id = req.params.id;
        const isDeleted = booksModel.delete(id);

        statusCode = 200;
        statusMessage = 'success';
        responseMessage = 'Buku berhasil dihapus';

        if( ! isDeleted ) 
        {
            statusCode = 404;
            statusMessage = 'fail';
            responseMessage = 'Buku gagal dihapus. Id tidak ditemukan';
        }

        httpResponse.status = statusMessage;
        httpResponse.message = responseMessage;
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