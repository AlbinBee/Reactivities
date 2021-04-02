import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react';

interface IProps {
    openCreateForm: () => void;
}

export const Navbar: React.FC<IProps> = ({ openCreateForm }) => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo-svg.svg" alt="logo" style={{ marginRight: '10px' }} />
                    Posto-ks
                </Menu.Item>
                <Menu.Item
                    name='Activities'
                />
                <Menu.Item>
                    <Button onClick={openCreateForm} positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}
