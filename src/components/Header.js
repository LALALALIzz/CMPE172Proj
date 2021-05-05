import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="main-head">
            <nav>
                <h1 id="logo">JustAnIdea</h1>
                <ul>
                    <li>
                        <Link to="/"><span id="header-txt"><span id="yellow">H</span>ome</span></Link>
                    </li>
                    <li>
                        <Link to="/books"><span id="header-txt"><span id="blue">B</span>ooks</span></Link>
                    </li>
                    <li>
                        <Link to="/cart"><span id="header-txt"><span id="yellow">C</span>art</span></Link>
                    </li>
                    <li>
                        <Link to="/checkout"><span id="header-txt"><span id="blue">C</span>heckout</span></Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
