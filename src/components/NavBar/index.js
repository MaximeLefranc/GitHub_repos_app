import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

function NavBar() {
  return (
    <Menu>

      {/* on precise à nos items de menu qu'on veut qu'ils soient des NavLink
      et on leur donne via la prop to ce qu'ils doivent afficher
      dans la barre d'url du navigateur quand un user clique dessus */}
      <Menu.Item
        name="Rechercher"
        as={NavLink}
        to="/"
      >
        Rechercher
      </Menu.Item>

      <Menu.Item
        name="FAQ"
        as={NavLink}
        to="/faq"
      >
        FAQ
      </Menu.Item>

    </Menu>
  );
}

export default NavBar;
