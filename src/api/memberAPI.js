import { postRequest, deleteRequest, getRequest, putRequest } from "./util";
export const AllMembers = () => [{
         id: "1",      
         firstName: "Ayesha",
         lastName: "sagheer",
     },
     {
         id: "2",
         firstName: "Maryam",
         lastName: "Liaqat",
     },
     {
         id:"3",
         firstName:"Jaweria",
         lastName:"humza",
     }
 ];
const BASE_URL = "/member";
 export const addMemberAPI = (data) => {
     getMembers().push(data);
};
export const getMembers = () => getRequest(`${BASE_URL}`);
export const getMember = (id) => getRequest(`${BASE_URL}/${id}`);
export const deleteMember = (id) => deleteRequest(`${BASE_URL}/${id}`);
export const addMember = (data) => postRequest(`${BASE_URL}`, data);
export const editMember = (id, data) => putRequest(`${BASE_URL}/${id}`, data);