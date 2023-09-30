import React , {Component} from 'react';
import  {Row, Col, Alert} from 'react-bootstrap';
import RestaurantListItem from './RestaurantsListItem';
import IRestaurant from '../../MODELS/IRestaurant';
import { LoadingStatus } from '../../MODELS/types';
import LoadingIndicator from '../common/LoadingIndicator';
import { getRestaurants } from '../../services/restaurants';


type Props= {
};

type State = {
    status: LoadingStatus,
    restaurants?:IRestaurant[],
    error?:Error
};


class RestaurantList extends Component<Props, State> {
    state: State = {
        status: 'LOADING'
    };

    render() {
        let el;
        const{status, restaurants,error} = this.state;

        switch(status) {
            case 'LOADING':
                el =(
                    <LoadingIndicator
                        size='large'
                        message='We are fetching the list of restaurants.
                        Please wait...'
                    />
                );
                break;

                case 'LOADED':
                el =(
                    <Row xs={1} md={2} lg={3}>
                        {
                            restaurants?.map(
                                restaurant =>(
                                    <Col key={restaurant.id} className='d-flex
                                    align-items-stretch my-3'>
                                        <RestaurantListItem
                                            restaurant={restaurant}
                                        />
                                    </Col>
                                )
                            )
                        }
                    </Row>
                );
                break;

                case 'ERROR_LOADING':
                el =(
                    <Alert variant="danger my-3">
                        {error?.message}
                    </Alert>
                );
                break;
        }
        
        return el;
    }

    async componentDidMount() {
        this.setState({
            status:'LOADING'
        });

        try{
            const data =await getRestaurants();
            this.setState({
                status:'LOADED',
                restaurants:data
            })
            await getRestaurants();
        }  catch(error){
            this.setState({
                status:'ERROR_LOADING',
                error: error as Error
            })

        }


        // const flattenedRestaurants = restaurants.flat();
        // setTimeout(() => {
        //     this.setState({
        //         status: 'LOADED',
        //         restaurants: flattenedRestaurants
        //     });
        //     this.setState({
        //         status: 'ERROR_LOADING',
        //         error:new Error('Due to High Demands we are unable to fetch Restaurants at this moment')
        //     });
        // },3000)
        
    };

}

export default RestaurantList;