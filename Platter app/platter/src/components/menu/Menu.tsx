import React, { useState, useEffect } from "react";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { getMenuForRestaurant } from "../../services/menu";
import IMenuItems from "../../MODELS/IMenuItems";
import AddMenuItem from "../add-menu-item/AddMenuItem";
import LoadingIndicator from "../common/LoadingIndicator";
import { Col, Row } from "react-bootstrap";
import { Link , RouteComponentProps, useParams } from "react-router-dom";


type Props = {
    id: number
};

const Menu = ({ id, match } : Props & RouteComponentProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState<IMenuItems[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await getMenuForRestaurant(id);
                setItems(data);
            } catch (error: any) {
                setError(error.response && error.response.data &&
                    error.response.data.message || error.message);
                setShow(true);
            } finally{
                setLoading(false)
            }
        };
        fetchMenu();
    }, []);

    return (
        <>
            {
                loading && (
                    <LoadingIndicator
                        size="large"
                        message="We are fetching the menu for the restaurant.Please wait..."
                    />
                )
            }
            {
                items && (
                <>
                    <div className="d-flex justify-content-between align-items-start my-2">
                        <h3>Menu</h3>
                        <Link 
                            to={`${match.url}/add`}
                            className="btn btn-primary btn-sm"
                        >
                            Add to menu
                        </Link>
                    </div>
                    <hr/>
                    {
                        items.map(
                            ({id, restaurantId, name, price, description, imageUrl }) => (
                                <Row key={id} className="my-3">
                                    <Col xs={6} lg={3}>
                                        <img
                                            src={`${process.env.REACT_APP_API_BASE_URL}${imageUrl}`}
                                            alt={name}
                                            className="w-100"
                                        />
                                    </Col>

                                    <Col xs={6} lg={9}>
                                        <h5>{name}</h5>
                                        <div className="my-2 text-sm">Rs.{price}</div>
                                        <div className="my-2 text-sm">{description}</div>
                                    </Col>
                                </Row>
                            
                            )
                        )
                    }                            
                </>
                )
            }
            {
                error && (
                    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
                        <Toast 
                            bg="danger"
                            show={show}
                            autohide
                            delay={5000}
                            onClose={()=> setShow(false)}
                        >
                            show={show}
                            <Toast.Header closeButton={false}>
                                Error                                
                            </Toast.Header>
                            <Toast.Body>{error?.message}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                )
            }
        </>
    );
};

export default Menu;