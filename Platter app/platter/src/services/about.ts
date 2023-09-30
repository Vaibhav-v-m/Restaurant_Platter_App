import axios from "axios";
import ImageSource from "../MODELS/ImageSource";

const getImagesources = () => {
    return axios.get<ImageSource[]>(`${process.env.REACT_APP_API_BASE_URL}/image-sources`)
        .then(response => response.data)
};

export {
    getImagesources
};