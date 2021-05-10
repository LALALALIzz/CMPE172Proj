import React, { useState, useContext} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { API, graphqlOperation, Storage } from "aws-amplify";
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { createBook, deleteBook} from '../api/mutations'
import config from '../aws-exports'
import { BookContext } from '../context/books';
import { Link, useHistory} from "react-router-dom";

const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config


const Admin = () => {
    const [image, setImage] = useState(null);
    const [bookDetails, setBookDetails] = useState({ title: "", description: "", image: "", author: "", price: "" });
    const [deleteDetails, setdeleteDetails] = useState({ id:""});
    const { books } = useContext(BookContext);

    if (!books.length) {
        return <h3>No Books Available</h3>
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!bookDetails.title || !bookDetails.price) return
            await API.graphql(graphqlOperation(createBook, { input: bookDetails }))
            setBookDetails({ title: "", description: "", image: "", author: "", price: "" })
        } catch (err) {
            console.log('error creating todo:', err)
        }
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

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const extension = file.name.split(".")[1];
        const name = file.name.split(".")[0];
        const key = `images/${uuidv4()}${name}.${extension}`;
        const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
        try {
            // Upload the file to s3 with public access level.
            await Storage.put(key, file, {
                level: 'public',
                contentType: file.type
            });
            // Retrieve the uploaded file to display
            const image = await Storage.get(key, { level: 'public' })
            setImage(image);
            setBookDetails({ ...bookDetails, image: url });
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <section className="admin-wrapper">
            <AmplifyAuthenticator>
                <section>
                    <header className="form-header">
                        <h3>Add New Book</h3>
                        <AmplifySignOut></AmplifySignOut>
                    </header>
                    <form className="form-wrapper" onSubmit={handleSubmit}>
                        <div className="form-image">
                            {image ? <img className="image-preview" src={image} alt="" /> : <input
                                type="file"
                                accept="image/jpg"
                                onChange={(e) => handleImageUpload(e)} />}

                        </div>
                        <div className="form-fields">
                            <div className="title-form">
                                <p><label htmlFor="title">Title</label></p>
                                <p><input
                                    name="email"
                                    type="text"
                                    placeholder="Type the title"
                                    onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })}
                                    required
                                /></p>
                            </div>
                            <div className="description-form">
                                <p><label htmlFor="description">Description</label></p>
                                <p><input
                                    name="description"
                                    type="text"
                                    rows="8"
                                    placeholder="Type the description"
                                    onChange={(e) => setBookDetails({ ...bookDetails, description: e.target.value })}
                                    required
                                /></p>
                            </div>
                            <div className="author-form">
                                <p><label htmlFor="author">Author</label></p>
                                <p><input
                                    name="author"
                                    type="text"
                                    placeholder="Type the author's name"
                                    onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })}
                                    required
                                /></p>
                            </div>
                            <div className="price-form">
                                <p><label htmlFor="price">Price ($)</label>
                                    <input
                                        name="price"
                                        type="text"
                                        placeholder="What is the Price (USD)"
                                        onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })}
                                        required
                                    /></p>
                            </div>
                            <div className="featured-form">
                                <p><label>Featured?</label>
                                    <input type="checkbox"
                                        className="featured-checkbox"
                                        checked={bookDetails.featured}
                                        onChange={() => setBookDetails({ ...bookDetails, featured: !bookDetails.featured })}
                                    />
                                </p>
                            </div>
                            <div className="submit-form">
                                <button className="btn" type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </section>
                <section>
                <div>
                <h3>Book Inventory</h3>
                </div>
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
                </section>
            </AmplifyAuthenticator>
        </section>
    )
}

export default Admin
