import React from 'react'
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const Admin = () => {

    return (
      <>
        <Banner />
        <section className="admin-wrapper">
            <AmplifyAuthenticator>
            <header className="form-header">
                <h3>Master's Previlege</h3>
                <AmplifySignOut></AmplifySignOut>
            </header>
            <br />
            <br />
            <br />
                <section>
                <Link to={`/addbook`} className="btn book-link">Add Book</Link>>
                <Link to={`/bookinventory`} className="btn book-link">Inventory</Link>
                </section>
            </AmplifyAuthenticator>
        </section>
</>

    )
}

export default Admin
