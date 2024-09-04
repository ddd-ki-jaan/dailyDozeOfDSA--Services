import axios from "axios";

export const getAboutUs = async () => {
    try {
        const response = await axios.get("/api/v1/home/aboutUs");
        return response;
    } catch (error) {
        throw error;
    }
}

export const getHomeSubtitle = async () => {
    try {
        const response = await axios.get("/api/v1/home/homeSubtittle");
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getSiteOffering = async () => {
    try {
        const response = await axios.get("/api/v1/home/siteOffering");
        return response;
    } catch (error) {
        throw error;
    }
};