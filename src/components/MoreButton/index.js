import { Button, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function MoreButton({ fetchMoreRepo }) {
  return (
    <>
      <Divider />
      <Button
        fluid
        color="purple"
        onClick={() => {
          fetchMoreRepo();
        }}
      >
        Load more results
      </Button>
    </>
  );
}

MoreButton.propTypes = {
  fetchMoreRepo: PropTypes.func.isRequired,
};

export default MoreButton;
