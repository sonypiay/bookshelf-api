class BooksModel
{
    data = [];

    show(data) { return data ?? this.data; }
    showById(id) { return this.show().find((item) => item.id === id); }
    showIndex(id) { return this.show().findIndex((item) => item.id === id); }
    create(request) {
        if( ! request || request === undefined ) return false;

        this.data.push(request);
        return true;
    }
    update(id, request) {
        let result = false;
        const index = this.showIndex(id);
        const book = this.showById(id);

        if( book && index !== -1 )
        {
            request.finished = book.finished;
            request.insertedAt = book.insertedAt;
            this.data[index] = { id, ...request };

            result = true;
        }

        return result;
    }
    delete(id) {
        if( ! this.showById(id) || this.showById(id) === undefined ) return false;

        const deletedBook = this.data.filter((item) => item.id !== id);
        this.data = deletedBook;

        return true;
    }
}

module.exports = new BooksModel;