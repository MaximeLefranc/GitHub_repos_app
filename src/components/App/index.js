import { useState } from 'react';

import logo from '../../assets/images/logo-github.png';
import ReposResults from '../RepoResults';
import Message from '../Message';
import SearchBar from '../SearchBar';
import './styles.scss';
import data from '../../data/repos';

function App() {
  /* on créé un emplacement dans le state de App pour stocker la valeur de l'input,
  on donne cette valeur et la fonction qui permet de la modifier à SearchBar : via les props */
  const [search, setSearch] = useState('chocolat');

  const message = 'La recherche porte sur ';

  return (
    <div className="app">
      <img src={logo} alt="logo Github" />
      <SearchBar search={search} setSearch={setSearch} />
      <Message message={message} />
      <ReposResults repos={data.items} />
    </div>
  );
}

export default App;
