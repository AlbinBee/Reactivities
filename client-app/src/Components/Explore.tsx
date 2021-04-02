import React, { Fragment, useEffect } from 'react'
import { Button, Card, Container, Image, Label } from 'semantic-ui-react'
import agent from '../app/api/agent';
import { IActivity } from '../app/models/activity'
import { Navbar } from './nav/Navbar';

interface IProps {
    activities: IActivity[];
}

const Explore: React.FC<IProps> = ({ activities }) => {
    // const getAllActivities = () => {
    //     agent.Activities.list().then(response => {
    //         response.forEach((activity) => {
    //             console.log(activity);
    //         });
    //     });
    // }
    // useEffect(() => {
    //     getAllActivities();
    // }, []);
    return (
        <Fragment>
            <Container style={{ marginTop: '7em' }} >
                <Card.Group>
                    {activities.map((activity) => (
                        <Card>
                            <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{activity.title}</Card.Header>
                                <Card.Meta>
                                    <span>{activity.date}</span>
                                </Card.Meta>
                                <Card.Description>
                                    {activity.description}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                {activity.city}, {activity.venue}
                                <br />
                                <br />
                                <Label basic content={activity.category} />
                                <Button floated='right' content='See More' color='blue' />
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
            </Container>
        </Fragment>
    )
}

export default Explore
