import axios from 'axios';


export const profileApi = async () => {
    try {
        const response = await axios.get("http://localhost:8000/user/profile", { withCredentials: true });
        console.log("ssssssss", response)
        return response
    } catch (error) {
        console.log(error)
    }
  };