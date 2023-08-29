import axios from "axios";

const baseUrl = "/api/login";

const login = async (user) => {
    let loggedInUser = await axios.post(baseUrl, user);
    return loggedInUser.data;
};

export default { login };