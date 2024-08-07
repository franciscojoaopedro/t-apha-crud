import axios from "axios";




const api=axios.create({
    baseURL:"https://interview.t-alpha.com.br/api",
})


export default api;