import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import MoreButton from '../MoreButton';

function ReposResults({ repos, totalCount, fetchMoreRepo }) {
  // on a repos qui est un tableau d'objets
  // on veut un tableau de Card pour notre JSX

  return (
    <>
      <Card.Group itemsPerRow={3}>
        {
          repos.map((item) => (
            <Card
              image={item.owner.avatar_url}
              header={item.name}
              meta={item.full_name}
              description={item.description}
              key={item.id}
            />
          ))
        }
      </Card.Group>
      {/* affichage conditionnel : on affiche que si il reste des resultats non chargés */}
      {/*totalCount > repos.length && <MoreButton fetchMoreRepo={fetchMoreRepo} />*/}
    </>
  );
}

ReposResults.propTypes = {
  // la liste des repos à afficher sous forme de Card
  repos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      avatar_url: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  fetchMoreRepo: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default ReposResults;
