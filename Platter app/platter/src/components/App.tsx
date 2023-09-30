import React from 'react';
import { Container } from "react-bootstrap";
import {Route, Switch} from "react-router-dom";
import NavigationMenu from './NavigationMenu';
import Home from './Home';
import About from './About';
import imageUrls from '../data/image-sources';
import LoadingIndicator from './common/LoadingIndicator';
import Rating from './common/Rating';
import RestaurantListItem from './restaurants-list/RestaurantsListItem';
import IRestaurant from '../MODELS/IRestaurant';
import RestaurantList from './restaurants-list/RestaurantsList';
import RestaurantDetails from './restaurant-details/RestaurantDetails';
import AddMenuItem from './add-menu-item/AddMenuItem';


const App = () => {
    return (
        <>
            <NavigationMenu />
            <Container>
                <Switch>
                    <Route path="/about" component={About}/>
                    <Route path="/restaurants/:id" component={RestaurantDetails}/>
                    <Route path="/restaurants" component={RestaurantList}/>
                    <Route path="/" component={Home}/>


                    {/* <Home/> */}
                    {/* <About /> */}
                    {/* <LoadingIndicator size="large" message="The restaurants are being fetched.
                    Please wait..."/> */}
                    {/* <Rating value={3.75} className="me-2" />
                    3.75 (120 ratings) */}
                    {/* <RestaurantListItem restaurant={restaurant} /> */}
                    {/* <RestaurantList/> */}
                    {/* <RestaurantDetails/> */}
                    {/* <AddMenuItem id={1}/> */}
                </Switch>                
            </Container>
        </>
    );
};

export default App;