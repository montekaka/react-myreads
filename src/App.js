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
    ,shelfNames:{
      currentlyReading:'Currently Reading',
      wantToRead:'Want To Reading',
      read:'Read',
      none:'None'
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  updateShelf = (book, shelf) => {
    book.shelf = shelf
    let books = this.state.books.filter((c) => c.id !== book.id)
    books.push(book)
    this.setState((state) => ({
      books:books
    }))

    BooksAPI.update(book, shelf)
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
              shelfNames={this.state.shelfNames}
              onUpdateShelf={this.updateShelf}
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
