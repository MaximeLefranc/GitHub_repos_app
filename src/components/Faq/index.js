import { List } from 'semantic-ui-react';

function Faq() {
  return (
    <List>
      <List.Item>
        <List.Content>
          <List.Header>A quoi ça sert ?</List.Header>
          <List.Description>
            Cette application permet de trouver une liste de dépôts GitHub pour un critère donné.
          </List.Description>
        </List.Content>
      </List.Item>

      <List.Item>
        <List.Content>
          <List.Header>Comment faire une recherche ?</List.Header>
          <List.Description>
            Sur la page recherche, complétez le champ de recherche et valider la recherche.
          </List.Description>
        </List.Content>
      </List.Item>
    </List>
  );
}

export default Faq;
