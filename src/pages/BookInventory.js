import React, { useState, useContext} from 'react'
import { API, graphqlOperation } from "aws-amplify";
import { deleteBook } from '../api/mutations'
import { BookContext } from '../context/books';
import { Link} from "react-router-dom";
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';


const BookInventory = () => {
    const [deleteDetails, setdeleteDetails] = useState({ id:""});
    const { books } = useContext(BookContext);

    if (!books.length) {
        return <h3>No Books Available</h3>
    }

    const handleDelete = (id) => async (e) =>{
                e.preventDefault();
                const deleteDetails = {id: id};
                try {
                    await API.graphql(graphqlOperation(deleteBook, { input: deleteDetails}));
                } catch (err) {
                    console.log('error creating todo:', err)
                }
              }
    return (
                <section>
                <AmplifyAuthenticator>
                <header className="form-header">
                    <h3>Book Inventory</h3>
                    <AmplifySignOut></AmplifySignOut>
                </header>
                <div className="books">
                    {books.map(({ id, image, title }) => (
                        <article key={id} className="book">
                            <div className="book-image">
                                <img src={image} alt={title} />
                            </div>
                            <button className="btn book-link adminbtn" onClick = {(e) => handleDelete(id)(e)}>delete</button>
                            <Link to={`/bookupdate${id}`} className="btn book-link">update</Link>
                        </article>
                    ))}
                </div>
              </AmplifyAuthenticator>
              </section>

    )
}

export default BookInventory
