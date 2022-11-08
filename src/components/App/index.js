import { useState } from 'react';

import logo from '../../assets/images/logo-github.png';
import ReposResults from '../RepoResults';
import Message from '../Message';
import SearchBar from '../SearchBar';
import './styles.scss';

function App() {
  // input controlé pour SearchBar
  const [search, setSearch] = useState('');

  // message pour Message
  const [message, setMessage] = useState('Il y a x resultats(s)');

  // liste des repos pour ReposResults
  const [repos, setRepos] = useState([]);

  return (
    <div className="app">
      <img src={logo} alt="logo Github" />
      <SearchBar search={search} setSearch={setSearch} />
      <Message message={message} />
      <ReposResults repos={repos} />
    </div>
  );
}

export default App;
