import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { getCodeforcesUserProfile, getUserProfile, reset, setProfileType } from '../features/profile/profileSlice';
import { toast } from "react-toastify";
import Message from '../components/Message';
import HandleProfile from '../components/HandleProfile';
import ProblemsProfile from '../components/ProblemsProfile'
import {
    Container,
    Navbar,
    Nav,
    Row,
    Col,
    Button,
    Card,
    ListGroup,
    ListGroupItem,
    Image
} from 'react-bootstrap';

const Profile = (props) => {

    const { userName } = useParams();
    const dispatch = useDispatch();

    //const { user } = useSelector(state => state.auth);
    //console.log(user)

    const { profileType } = useSelector(state => state.profile);

    const onClickHandler = (type) => {
        const getTypeProfile = async () => {
             dispatch(setProfileType(type))
        }
        getTypeProfile();
        console.log(type);
    }
    return (
        <div>
            <Col>
                <Nav fill variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link onClick={() => onClickHandler('handle')} eventKey='link-0'>{userName}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => onClickHandler('problems')} eventKey="link-1">Problems</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => onClickHandler('groups')} eventKey="link-2">Groups</Nav.Link>
                    </Nav.Item>
                </Nav>

                {profileType === 'handle'
                    ? <HandleProfile userName={userName} />
                    : profileType === 'problems' 
                    ? < ProblemsProfile userName={userName}/>
                    : <Button>dsadasd</Button>
                }

        </Col>
        </div >
    )
}

export default Profile