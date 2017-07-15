import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ListBook from './ListBook'


class ListBooks extends Component{

  static propTyes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  groupBookByCategory = (books, shelfName) => {
    let categories = Object.keys(shelfName)
    let booksByShelf = {}

    categories.forEach((category) => {
      booksByShelf[category] = books.filter((b) => b.shelf === category)
    })

    return booksByShelf
  }

  render() {
    const { books, shelfNames, onUpdateShelf} = this.props

    let booksByShelf = this.groupBookByCategory(books, shelfNames)
    let bookShelds = Object.keys(shelfNames)
    bookShelds.sort()

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
                      <ListBook
                        key={book.id}
                        book={book}
                        onUpdateShelf={onUpdateShelf}
                        ></ListBook>
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
