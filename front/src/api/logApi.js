import { API_BASE_URL, userId } from "../constant/constant";

export const getLog = async() => {
    try { 
        const res = await fetch(`${API_BASE_URL}/log/${userId}`,{
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
            }
        })
        return res.json();
    } catch(error) {
        throw error
    }
}

export const insertLog = async () => {
    try{
        const res = await fetch(`${API_BASE_URL}/log/${userId}`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ }),
              // credentials: "include",         
        }); 
        return res.json();
    } catch(error) {
        throw error
    }
}