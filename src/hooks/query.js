
// import getProperty from '@/app/server/property/getAction';
// import getBlogsList from '@/app/server/blog/getBlogs';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { endPoint, queryKeys } from './queryContants';



export const useQueryGetBlogList = () => {
  const queryKey = [queryKeys.getBlogList];

  const queryFn = async () => {
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `${endPoint}/blog/getBlogs`,
      headers: {
        Accept: 'application/json',
      },
    };
  
    const tx = await axios.request(config);

    return tx?.data?.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (res) => {
      console.log(res);
    },
  });
};


export const useQueryGetProperty = () => {
  const queryKey = [queryKeys.getPropertiesList];

  const queryFn = async () => {
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `${endPoint}/property/getAction`,
      headers: {
        Accept: 'application/json',
      },
    };
  
    const tx = await axios.request(config);

    return tx?.data?.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    onError: (error) => {
      console.error("Query Error:", error);
    },
    onSuccess: (data) => {
      console.log("Query Success:", data);
    },
  });
};