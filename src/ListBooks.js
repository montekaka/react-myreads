import React, {Component} from 'react'

class ListBooks extends Component{

  render() {
    const { books, booksByShelf, shelfNames} = this.props
    let bookShelds = Object.keys(booksByShelf)
    console.log(books)
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
                              <select>
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
