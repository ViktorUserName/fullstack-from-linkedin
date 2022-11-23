import React from 'react';
import {Link} from 'react-router-dom'
import s from './pages.module.scss'

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <li className={s.navLi}>
                <Link to='/'>home</Link>
            </li>
            <li className={s.navLi}>
                <Link to='/about'>about</Link>
            </li>
            <li className={s.navLi}>
                <Link to='/articles'>article</Link>
            </li>
        </nav>
    );
};

export default Navbar;