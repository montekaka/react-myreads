import React, {Component} from 'react'
//import PropTypes from 'prop-types'

class ListBooks extends Component{

  updateImageLink = (book) => {
    let smallThumbnail
    
    if(book.imageLinks){
      smallThumbnail = book.imageLinks.smallThumbnail
    } else {
      smallThumbnail =  'http://via.placeholder.com/128x193'
    }
    return smallThumbnail
  }

  render(){

    const { book, onUpdateShelf} = this.props

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ this.updateImageLink(book)})` }}></div>
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
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    )
  }
}

export default ListBooks
