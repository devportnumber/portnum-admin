import { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useAxios = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async (url, method, requestBody, params) => {
    try {
      setLoading(true);
      const response = await axios({
        method: method,
        url: "https://portnumber.site/admin" + url,
        data: requestBody,
        params: params,
      });

      setData(response.data);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};
