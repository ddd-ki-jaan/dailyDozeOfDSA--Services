import axios from 'axios';

export async function saveContactUsData(formData) {
    try {
        const response = await axios.post('/api/v1/footer/contactUs', formData);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function saveReportBugData(formData) {
    try {
        const response = await axios.post('/api/v1/footer/reportBug', formData);
        return response;
    } catch (error) {
        throw error;
    }
}