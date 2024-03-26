import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' header>
          <img src="assets/logo.png" alt="logo" style={{marginRight: 10}} />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities' name="Activites" />
        <Menu.Item>
          <Button as={NavLink} to='/createActivity' positive content ="Create Activity"/>
          <Button as={NavLink} to='/errors' positive content ="Errors"/>
        </Menu.Item>
      </Container>
    </Menu>
  )
}