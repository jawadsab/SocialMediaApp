import axios from "axios";


const api = axios.create({baseUrl: "http://localhost:8080"},{
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;