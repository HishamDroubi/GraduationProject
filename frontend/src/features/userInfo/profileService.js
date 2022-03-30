import axios from "axios";
const getUserProfile = async (userName) => {
    const {data} = await axios.get(`/user/${userName}`);
    return data;
}

const getCodeforcesUserProfile = async (userName) => {
    try {
        const { data } = await axios.get(`/user/codeforcesInfo/${userName}`);
        return data;
    }
    catch(e){
        console.log(e.message)
    }
}
const profileService = {
    getUserProfile,
    getCodeforcesUserProfile
};

export default profileService;