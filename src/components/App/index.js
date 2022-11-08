import { useState } from 'react';

import logo from '../../assets/images/logo-github.png';
import ReposResults from '../RepoResults';
import Message from '../Message';
import SearchBar from '../SearchBar';
import './styles.scss';
import axios from 'axios';

function App() {
  // input controlé pour SearchBar
  const [search, setSearch] = useState('');

  // message pour Message
  const [message, setMessage] = useState('Il y a x resultats(s)');

  // liste des repos pour ReposResults
  const [repos, setRepos] = useState([]);

  // fonction qui lance la requete API et qui enregistre les resultats dans le state (dans repos)
  const fetchRepos = async () => {
    try {
      const response = await axios.get(`https://api.github.com/search/repositories?q=${search}`);

      // mise à jour du state avec les nouveaux repos
      setRepos(response.data.items);
    }
    catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="app">
      <img src={logo} alt="logo Github" />
      <SearchBar search={search} setSearch={setSearch} fetchRepos={fetchRepos} />
      <Message message={message} />
      <ReposResults repos={repos} />
    </div>
  );
}

export default App;
