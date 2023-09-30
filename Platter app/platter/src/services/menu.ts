import axios from "axios";
import IMenuItems from "../MODELS/IMenuItems";

const getMenuForRestaurant = (id: number) => {
    return axios.get<IMenuItems[]>(`${process.env.REACT_APP_API_BASE_URL}/restaurants/${id}/items`)
        .then(response => response.data)
};
const addItemToMenu = (menuItem: Omit<IMenuItems, 'id'>) => {
    return axios.post<IMenuItems>(
        `${process.env.REACT_APP_API_BASE_URL}/items`,
        menuItem,
        {
            headers: {
                'content-type': 'application/json'
            }
        }
    )
        .then(response => response.data)
};


export {
    getMenuForRestaurant,
    addItemToMenu
};