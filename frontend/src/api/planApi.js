const URI = "http://localhost:3000";
import axios from "axios";

export const fetchAllPlans = async() => {
  try {
    const res = await axios.get(`${URI}/api/plan/fetchAllPlans`)
    return res;
  } catch (error) {
    console.log("fetchAllPlans", error);
  }
}