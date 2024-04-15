import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';

export default function NavBar() {
  const { userStore: { user, logout } } = useStore();
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
        <Menu.Item postition='right'>
          <Image src={user?.image || '/assets/user.png'} avatar space='right'>
          <Dropdown
          </Image>
        </Menu.Item>
      </Container>
    </Menu>
  )
}