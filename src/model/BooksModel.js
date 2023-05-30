class BooksModel
{
    data = [];

    show(data) { return data ?? this.data; }
    create(request) { this.data.push(request); }
    update(id, request) {}
}

module.exports = new BooksModel;