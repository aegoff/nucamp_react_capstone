import React, {Component} from 'react';
import { Card, CardImg, Button, CardText, Modal, ModalHeader, ModalBody,CardBody, 
    Breadcrumb, BreadcrumbItem, Col, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state={
            modal:false,
            rating:'',
            author:'',
            text:'',
            touched:{
                rating: false,
                author: false,
                text: false
            }
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
    }
    handleSubmit(values) {
        alert("Current state is: " + JSON.stringify(values));
        this.toggleModal();
        
    }
    toggleModal(){
        this.setState({
            modal: !this.state.modal
        });
    }
    render(){
        return(
            <>
                <Button outline onClick={this.toggleModal}><i className="fa fa-pencil fa-lg"></i> Submit Comment</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={10} offset={2}>
                                <Label htmlFor="rating">Rating</Label>
                                
                                <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control"
                                        >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                </Control.select>
                                </Col>                                
                            </Row>
                            <Row className="form-group">
                                <Col md={10} offset={2}>
                                    <Label htmlFor="author" >Your Name</Label>
                                        <Control.text model=".author" id="author" name="author"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                required,
                                                minLength: minLength(2),
                                                maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be at least 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={10} offset={2}>
                                    <Label htmlFor="text">Comment</Label>
                                    
                                        <Control.textarea model=".text" id="text" name="text"
                                            rows="5"
                                            className="form-control"
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                    <Button type="submit" color="primary" >
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }

}


function RenderComments({comments}){
        if (comments){
            return(
            <div className='col-md-5 m-1'>
                <h4>Comments</h4>
                {comments.map(comment=>
                    <div>
                    <p>{comment.text}<br/>
                    -{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                )}
                <CommentForm/>
            </div>);
        
}
}

function RenderCampsite({campsite}){
        
        return (
            <div className='col-md-5 m-1'>
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name}/>
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
        
}

function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            );
        }
        return <div></div>;
}

export default CampsiteInfo;
