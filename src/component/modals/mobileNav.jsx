import { useState } from 'react';
import navMobile from '../../data/botones.json'; // Import navigation data

// HeaderMobileNav Component
const HeaderMobileNav = () => {
  const [selectedId, setSelectedId] = useState(null); // Track selected ID

  // Function to render the list of ids
  const renderNavItems = () => {
    return navMobile.map((region, index) => (
      <li className="header-mobile-nav__item" key={index}>
        <a
          className="header-mobile-nav__link"
          onClick={() => setSelectedId(region.id)} // Set the selected id when clicked
        >
          <small>{region.id}</small> {/* Displaying the id */}
        </a>
      </li>
    ));
  };

  return (
    <div className="header-mobile-nav__content">
      <ul className="header-mobile-nav__list">
        {renderNavItems()}
      </ul>
    </div>
  );
};

export default HeaderMobileNav;
