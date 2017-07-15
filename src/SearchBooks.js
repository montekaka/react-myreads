import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBook from './ListBook'
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'

class SearchBooks extends Component{

  state = {
    query: '',
    maxResults: 20,
    showingBooks: []
  }

  updateQuery=(query) => {
    this.setState({query})
    //this.setState({query: query.trim()})
  }

  setupBook = (book) => {
    let addedBook = this.props.addedBooks.filter((b) => b.id === book.id)
    if(addedBook.length === 1){
      book = addedBook[0]
    }
    return book
  }

  // clearQuery=() => {
  //   this.setState({query: ''})
  // }

  searchBooks = (query, maxResults) => {
    this.updateQuery(query)

    if(query){
      BooksAPI.search(query, maxResults).then((showingBooks) => {
        if(showingBooks.error){
          this.setState({showingBooks:[]})
        }else{
          this.setState({showingBooks})
        }
      })
    } else {
      this.setState({query: ''})
      this.setState({showingBooks:[]})
    }
  }

  render(){
    const {query, maxResults, showingBooks} = this.state
    const {onUpdateShelf} = this.props

    return (
      <div key="search">
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search" >Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text"
                value={query}
                onChange={(event) => this.searchBooks(event.target.value, maxResults)}
                placeholder="Search by title or author"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {showingBooks.map((book, idx) => (
                <ListBook
                  key={idx}
                  book={this.setupBook(book)}
                  onUpdateShelf={onUpdateShelf}
                  />
              ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBooks
