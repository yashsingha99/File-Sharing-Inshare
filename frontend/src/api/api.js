const URI = "http://localhost:3000";
import axios from "axios";

export const addFile = async (data) => {
  console.log(URI);
  try {
    const res = await axios.post(`${URI}/api/file/`, data);
    console.log("addFile => ", res);
    return res;
  } catch (error) {
    console.log("addFile", error);
  }
};

export const createUser = async (data) => {
  try {
    const res = await axios.post(`${URI}/api/user/register`, data);
    console.log("createUser => ", res);
    return res;
  } catch (error) {
    console.log("createUser => ", error);
  }
};

export const upadatePassword = async (data) => {
  try {
    const res = await axios.post(`${URI}/api/file/updatePassword`, data);
    console.log("upadatePassword => ", res);
    return res;
  } catch (error) {
    console.log("upadatePassword => ", error);
  }
};

export const fetchFile = async (data) => {
  try {
    console.log(data);

    let val = { id: data };
    const res = await axios.post(`${URI}/api/file/fetchFile`, val);
    console.log("fetchFile", res);
    return res;
  } catch (error) {
    console.log("fetchFile", error);
  }
};

export const userFiles = async (user) => {
  try {
    const res = await axios.post(`${URI}/api/file/userFiles`, user);
    console.log("fetchFile", res);
    return res;
  } catch (error) {
    console.log("fetchFile", error);
  }
};

export const addPlan = async (data) => {
  try {
    const res = await axios.post(`${URI}/api/user/addPlan`, data);
    console.log("addPlan", res);
    return res;
  } catch (error) {
    console.log("addPlan", error);
  }
};

export const updateStatus = async (data) => {
  try {
    const res = await axios.post(`${URI}/api/file/unActiveFile`, {fileId : data});
    console.log("updateStatus", res);
    return res;
  } catch (error) {
    console.log("updateStatus", error);
  }
};

export const fetchPlan = async (data) => {
  try {
    const res = await axios.get(`${URI}/api/user/fetchPlan`, data);
    console.log("fetchPlan", res);
    return res;
  } catch (error) {
    console.log("fetchPlan", error);
  }
};

export const decreaseValidity = async (data) => {
  try {
    const res = await axios.post(`${URI}/api/user/decreaseValidity`, data);
    console.log("decreaseValidity", res);
    return res;
  } catch (error) {
    console.log("decreaseValidity", error);
  }
};


export const fetchActivatedBuyPlan = async () => {
  
}
