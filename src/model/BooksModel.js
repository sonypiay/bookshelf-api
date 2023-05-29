class BooksModel
{
    data = [];

    show(data) { return data ?? this.data; }
    create(request) { this.data.push(request); }
}

module.exports = new BooksModel;