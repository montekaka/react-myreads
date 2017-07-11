import React from 'react'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    books:[]
    ,booksByShelf:{}
    ,shelfNames:{
      currentlyReading:'Currently Reading',
      wantToRead:'Want To Reading',
      read:'Read'
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      let booksByShelf = this.groupBookByCategory(books)
      this.setState({books})
      this.setState({booksByShelf})
    })
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
    return (
      <div className="app">
        <Route path="/search" render={() => (
            <SearchBooks></SearchBooks>
        )}/>

      <Route exact path="/" render={({history}) => (
          <div className="list-books">
            <ListBooks
              books={this.state.books}
              booksByShelf={this.state.booksByShelf}
              shelfNames={this.state.shelfNames}
              >
            </ListBooks>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
