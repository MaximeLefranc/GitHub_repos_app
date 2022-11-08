import Message from '../Message';
import ReposResults from '../RepoResults';
import SearchBar from '../SearchBar';
import Spinner from '../Spinner';

function SearchPage({
  search, setSearch, fetchRepos, isLoading,
  message, repos, totalCount, fetchMoreRepo
}) {
  return (
    <>
      <SearchBar
        search={search}
        setSearch={setSearch}
        fetchRepos={fetchRepos}
        isLoading={isLoading}
      />
      {/* affichages conditionnels :
      - on affiche <Message> que si message vaut non chaine vide
      - on affiche <Spinner> que si isLoading vaut vrai
      */}
      {(message !== '') && <Message message={message} />}
      {isLoading && <Spinner />}
      <ReposResults repos={repos} totalCount={totalCount} fetchMoreRepo={fetchMoreRepo} />
    </>
  );
}

export default SearchPage;
