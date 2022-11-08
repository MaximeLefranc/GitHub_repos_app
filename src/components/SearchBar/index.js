import { Input, Form, Segment } from 'semantic-ui-react';

function SearchBar() {
  return (
    <Form>
      <Segment>
        <Input
          fluid
          icon="search"
          placeholder="Search..."
          iconPosition="left"
        />
      </Segment>
    </Form>
  );
}

export default SearchBar;
