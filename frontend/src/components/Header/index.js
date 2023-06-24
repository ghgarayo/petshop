import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/header.css';
export default function Header() {
    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom ">
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <Link to="/" className="d-flex align-items-center mb-2 mb-md-0 text-decoration-none nav-link custom-button">
                    <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
                    Home
                </Link>
                </ul>
                

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li>
                        <Link className="nav-link custom-button" to="/carrinho">
                            Meu carrinho
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link custom-button" to="/alteracao">
                            Minha conta
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link custom-button" to="/cliente">
                            Criar conta
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link custom-button" to="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            </header>
        </div>
    );
}