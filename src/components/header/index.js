import react from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {auth} from '../../firebase/utils'
import './style.css';
import Logo from '../../logo.png'

const Header = props => {
    const currentUser = props;
    return(
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <div className="row w-100">
                        <div className="col-12 d-flex justify-content-between py-1">
                            <Link className="navbar-brand w-100" to="/">
                                <img src={Logo} alt="Ecomm" />
                            </Link>
                            <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse w-100" id="navbarTogglerDemo03">
                                <ul className="navbar-nav ml-sm-auto mr-auto mr-sm-0 mt-2 mt-lg-0">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/product">Product</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="#">About</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="#">Contact</Link>
                                    </li>
                                    {currentUser.currentUser == null && (
                                        <li className="nav-item ml-5">
                                            <Link className="nav-link" to="/login">Login</Link>
                                        </li>                
                                    )}
                                    {currentUser.currentUser == null && (
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/signup">Signup</Link>
                                        </li>
                                    )}
                                    {currentUser.currentUser != null && (
                                        <li className="nav-item ml-5">
                                            <span className="nav-link" onClick={() => auth.signOut()}>Logout</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

Header.defaultProps = {
    currentUser: null
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
});

export default connect(mapStateToProps,null)(Header);