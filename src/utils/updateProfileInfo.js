import { useSelector } from "react-redux";

export const updateProfileInfo = async (body, type) => {
    const headers = headerWithJWT();
    // const headers={

    // };
    let requestUrl = 'https://academics.newtonschool.co/api/v1';
    if (type == "password") {
      requestUrl += "/user/updateMyPassword";
    } else if (type == "username") {
      requestUrl += "/user/updateme";
    } else {
      toast.error("Something went wrong");
      return;
    }
  
    try {
      const res = await fetch(requestUrl, body, headers);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const headerWithJWT = () => {
    // const authToken = localStorage.getItem("authToken");
    const authToken=useSelector((store)=>store.auth.token);
    
        return {
          headers: {
            projectID: "fio1831j50s3",
            Authorization: `Bearer ${authToken}`
          },
        };
      };