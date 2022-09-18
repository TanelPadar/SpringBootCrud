import React, { useState } from 'react';
import axios from "axios";
import './users.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function EditModal({user}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="btn-dark" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label htmlFor="fname" >First name:</label>
                        <input type="text" id="fname" name="fname" placeholder={user.name}></input><br></br>
                        <label htmlFor="lname" >Last name:</label>
                        <input type="text" id="lname" name="lname" placeholder={user.surname}></input><br></br>
                        <label htmlFor="email" >email:</label>
                        <input type="text" id="email" name="email" placeholder={user.email} ></input>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default class User extends React.Component{
    state = {
        users: []
    }

    componentDidMount() {
        axios.get('http://localhost:8080/user/all')
            .then(res => {
                const users = res.data
                this.setState({users})
            })
    }

    deleteUser(user_id) {

        axios.delete('http://localhost:8080/user/delete/' + user_id)
            .then(() => {
                let users = this.state.users
                users = users.filter(user => user.user_id !== user_id)
                this.setState({users:users})
            })

    }

    addUser() {

        axios.post('http://localhost:8080/user/adduser')
            .then(() => {

            })

    }

    render() {

        return (
            <ul>
                {
                    this.state.users
                        .map(user => {
                         return (
                             < >

                                 <div class="userList">
                                <li key={user.user_id}>nimi: {user.name}  {user.surname}, email:{user.email}</li>
                                     <div className="buttonsForUser">
                                     <EditModal user={user} />
                                     <button class="btn-danger btn btn-primay ms-1 " onClick={()=>this.deleteUser(user.user_id)}>X</button>
                                     </div>
                                 </div>

                             </>)

                    })}

                <div class="newUserButton" onClick={()=>this.addUser()}><button>new User</button></div>
            </ul>

    )

    }
}