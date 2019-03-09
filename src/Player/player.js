import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form } from 'reactstrap';
import '../App.css'
class player extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            firstName: "",
            lastName: "",
            score: "",
            player: [{
                firstName: "pqr",
                lastName: "fr",
                score: 88
            }, {
                firstName: "abc",
                lastName: "ghf",
                score: 99
            }, {
                firstName: "abc",
                lastName: "duh",
                score: 99
            },
            ],
            EditModal: false,
            index: "",
            errMsg: ""
        };
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    deleteClick = (p, id) => {
        if (window.confirm("are you sure you want to delete this player")) {

            const { player } = this.state;

            let players = player.filter((player, i) => {
                return i !== id;
            })

            this.setState({ player: players });
        }
    }
    addPlayer = () => {

        const { firstName, lastName, score, player } = this.state;
        if (parseInt(score) >= 0 && parseInt(score) <= 100) {
            let newPlayer = { firstName, lastName, score: parseInt(score) };
            if (firstName !== "" && lastName !== "" && score !== "") {
                player.push(newPlayer);
                this.setState({ player, firstName: "", lastName: "", score: "" });
                this.toggle();
            }
        }
    }
    sortPlayer = (player) => {
        return player.sort((p, q) => {
            if (p.score === q.score) {
                let pLastName = p.lastName.toLowerCase();
                let qLastName = q.lastName.toLowerCase();
                if (pLastName < qLastName) {
                    return -1;
                }
            } else {
                return q.score - p.score
            }
            return true;
        });

    }
    updateClick = (p, i) => {
        this.setState({ firstName: p.firstName, lastName: p.lastName, score: parseInt(p.score), index: i });
        this.toggleEdit();
    }
    updatePlayer = () => {
        const { player, firstName, lastName, score, index } = this.state;
        let updatePlayer = { firstName, lastName, score };
        player[index] = updatePlayer;
        this.setState({ player: player, firstName: "", lastName: "", score: "" });
        this.toggleEdit();
    }
    toggleEdit = () => {
        this.setState({ EditModal: !this.state.EditModal })
    }
    cancelClick = () => {
        this.setState({ firstName: "", lastName: "", score: "" });
        (this.state.EditModal === true) ? this.toggleEdit() : this.toggle()
    }
    render() {
        const { firstName, lastName, score, player } = this.state;

        let sortPlayer = this.sortPlayer(player);

        let data = sortPlayer.map((player, i) => {
            return <tr key={i}>
                <td>{i + 1}</td>
                <td className="t-center" colSpan="2">{player.firstName} {player.lastName}</td>
                <td className="t-center">{player.score}</td>
                <td className="t-center">
                    <Button color="primary" onClick={() => this.updateClick(player, i)}>Update</Button>{' '}
                    <Button color="danger" onClick={() => this.deleteClick(player, i)}>Delete</Button></td>
            </tr>
        })

        return (
            <React.Fragment>
                <Button className="mright" color="primary" onClick={this.toggle}>{this.props.buttonLabel}Add</Button>
                <Modal isOpen={(this.state.EditModal === true) ? this.state.EditModal : this.state.modal}
                    toggle={(this.state.EditModal === true) ? this.toggleEdit : this.toggle} className={this.props.className}>
                    <ModalHeader toggle={(this.state.EditModal === true) ? this.toggleEdit : this.toggle}>{(this.state.EditModal === true) ? <p>Update Player</p> : <p>Add Player</p>}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="firstName">First Name:</Label>
                                <Input type="text"
                                    name="firstName"
                                    placeholder="Enter First Name"
                                    value={firstName}
                                    onChange={this.handleChange}
                                />

                            </FormGroup>
                            <FormGroup>
                                <Label for="lastName">Last Name:</Label>
                                <Input type="text"
                                    name="lastName"
                                    placeholder="Enter Last Name"
                                    value={lastName}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Score">Score:</Label>
                                <Input type="text"
                                    name="score"
                                    placeholder="Enter Score"
                                    value={score}
                                    onChange={this.handleChange}
                                />
                                {(score > 100) ? <p className="alerts">score should be 100 or less than 100*</p> : <p></p>}
                                {(score < 0) ? <p className="alerts">please enter valid score*</p> : <p></p>}
                            </FormGroup>
                        </Form>
                    </ModalBody>

                    <ModalFooter>
                        {(this.state.EditModal === true) ?
                            <Button color="primary" onClick={this.updatePlayer}>Update</Button> :
                            <Button color="primary" onClick={this.addPlayer}>Add</Button>}
                        <Button color="danger" onClick={this.cancelClick}>Cancel</Button>

                    </ModalFooter>
                </Modal>
                <div className="container">
                    <div className="table-responsive">
                        <table id="example" className="table table-striped" width="100%">
                            <thead>
                                <tr>
                                    <th >#</th>
                                    <th style={{ textAlign: "center" }} colSpan="2">Name</th>
                                    <th style={{ textAlign: "center" }}>Score</th>
                                    <th style={{ textAlign: "center" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default player;
