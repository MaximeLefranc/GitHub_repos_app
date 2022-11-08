import { Card } from 'semantic-ui-react';

function ReposResults() {
  return (
    <Card.Group itemsPerRow={3}>
      <Card
        image="https://avatars3.githubusercontent.com/u/698437?v=4"
        header="React"
        meta="React"
        description="Un super framework !"
      />
      <Card
        image="https://avatars3.githubusercontent.com/u/698437?v=4"
        header="React"
        meta="React"
        description="Un super framework !"
      />
      <Card
        image="https://avatars3.githubusercontent.com/u/698437?v=4"
        header="React"
        meta="React"
        description="Un super framework !"
      />
    </Card.Group>
  );
}

export default ReposResults;
