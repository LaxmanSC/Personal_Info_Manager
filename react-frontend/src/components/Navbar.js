import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom';
import { Context } from '../store/appContext';
import './Navbar.css';
import {Button} from './Button';

function Navbar() {
  const[click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { store, actions} = useContext(Context);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);
    
  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            PIM <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              {!store.token ? 
                <Link to='/Login' className='nav-links' onClick={closeMobileMenu}>
                  Login
                </Link>
                :
                 <Link to="/" className='nav-links-Log' onClick={() => actions.logout()}>
                    Logout
                  </Link> 
              }
            </li>
            <li>
              <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle = 'btn--outline'>SIGN UP</Button>}
        </div>
      </nav>
    </>
  )
}

export default Navbar
