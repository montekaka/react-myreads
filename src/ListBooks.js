import React, {Component} from 'react'
import PropTypes from 'prop-types';


class ListBooks extends Component{

  static propTyes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  groupBookByCategory = (books) => {
    let booksByShelf = {}
    
    books.forEach((book) => {
      let bookShelf = book.shelf
      if(Object.keys(booksByShelf).includes(bookShelf)){
        booksByShelf[bookShelf].push(book)
      } else {
        booksByShelf[bookShelf] = [book]
      }
    })
    return booksByShelf
  }

  render() {
    const { books, shelfNames, onUpdateShelf} = this.props

    let booksByShelf = this.groupBookByCategory(books)
    let bookShelds = Object.keys(booksByShelf)

    return (
      <div>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookShelds.map((sheld)=> (
              <div className="bookshelf" key={sheld}>
                <h2 className="bookshelf-title">{shelfNames[sheld]}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {booksByShelf[sheld].map((book)=>(
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select
                                value={book.shelf}
                                onChange={(event) => onUpdateShelf(book, event.target.value)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors[0]}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks
