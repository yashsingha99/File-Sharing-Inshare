const URI = "http://localhost:3000";
import axios from "axios";

export const fetchPurchashedPlans = async (user) => {
  try {
      const userdata = {email : user.primaryEmailAddress.emailAddress, username : user.username}
      // console.log(userdata);
    const res = await axios.post(`${URI}/api/user/fetchPurchashedPlans`, userdata);
    return res;
  } catch (error) {
    console.log("fetchPurchashedPlans", error);
  }
};
export const changeisActivate = async (buyPlan) => {
  try {
    const res = await axios.post(`${URI}/api/user/changeisActivate`, buyPlan);
    return res;
  } catch (error) {
    console.log("changeisActivate", error);
  }
};

export const isAbleToShare = async (data) => {
  try {
    const userdata = {email : data.user.primaryEmailAddress.emailAddress, username : data.user.username}
    const fileInfo = {userdata, size : data.size}
    const res = await axios.post(`${URI}/api/user/isAbleToShare`, fileInfo);
    return res;
  } catch (error) {
    console.log("isAbleToShare", error);
  }
};

