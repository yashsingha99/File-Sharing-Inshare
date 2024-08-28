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
export const changeIsActivate = async (buyPlan) => {
  try {
    const res = await axios.post(`${URI}/api/user/changeisActivate`, buyPlan);
    console.log(res);
    
    return res;
  } catch (error) {
    console.log("changeisActivate", error);
  }
};



