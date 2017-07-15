import React from 'react'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    books:[],
    showingBooks: []
  }


  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }


  updateShelf = (book, shelf) => {
    book.shelf = shelf
    this.setState((state) => ({
      books: state.books.filter(b => b.id !== book.id).concat([ book ])
    }))

    BooksAPI.update(book, shelf)
  }

  render() {
    let shelfNames = {
      currentlyReading:'Currently Reading',
      wantToRead:'Want To Reading',
      read:'Read',
      //none:'None'
    }


    return (
      <div className="app">
        <Route path="/search" render={() => (
            <SearchBooks
              onUpdateShelf={this.updateShelf}
              addedBooks={this.state.books}>
            </SearchBooks>
        )}/>

        <Route exact path="/" render={({history}) => (
            <div className="list-books">
              <ListBooks
                books={this.state.books}
                shelfNames={shelfNames}
                onUpdateShelf={this.updateShelf}
                />
                <div className="open-search">
                  <Link to="/search">
                    Add a book
                  </Link>
                </div>
            </div>
          )}/>
      </div>
    )
  }
}

export default BooksApp
