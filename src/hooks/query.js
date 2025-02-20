// import getProperty from '@/app/server/property/getAction';
// import getBlogsList from '@/app/server/blog/getBlogs';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { endPoint, queryKeys, user_auth } from './queryContants';
import { useMutationSendExchangeRate } from './mutation';
import { useEffect } from 'react';

// export const useAutoUpdateExchangeRate = () => {

//   useEffect(() => {
//     if (copRate) {
//       mutation.mutate(copRate);
//     }
//   }, [copRate]); // Runs every time `copRate` updates (every 5 sec)

//   return (
//     <div>
//       <button onClick={() => mutation.mutate(copRate)}>hello</button>
//     </div>
//   );
// };

function convertToSubcurrency(amount, factor = 100) {
  return Math.round(amount * factor);
}

export const useQueryGetBlogList = () => {
  const { data: user } = useQueryGetUser();
  const queryKey = [queryKeys.getBlogList, user?.email];

  const queryFn = async () => {
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `${endPoint}/blog/getBlogs`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${user?.token}`,
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
  const { data: user } = useQueryGetUser();
  const queryKey = [queryKeys.getPropertiesList, user];

  const queryFn = async () => {
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `${endPoint}/property/getAction`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const tx = await axios.request(config);

    return tx?.data?.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    onError: (error) => {
      console.error('Query Error:', error);
    },
    onSuccess: (data) => {
      console.log('Query Success:', data);
    },
  });
};

// export const useQueryInitiatePayment = (id) => {
//   const { data: user } = useQueryGetUser();
//   const queryKey = [queryKeys.getUserIntendDetails, id];

//   const queryFn = async () => {
//     if (!id) {
//       throw new Error('Property ID is required');
//     }

//     try {
//       const config = {
//         method: 'POST',
//         url: `${endPoint}/userInstants/create-payment-intent`,
//         headers: {
//           Accept: 'application/json',
//           Authorization: `Bearer ${user?.token}`,
//         },
//         data: { id }, // Correctly pass the body as `data` in axios
//       };

//       const response = await axios.request(config);

//       // Axios doesn't have an `ok` property; check `status` instead
//       if (response.status < 200 || response.status >= 300) {
//         throw new Error(
//           `Error: ${response.status} - ${response.statusText || 'Unknown error'}`
//         );
//       }

//       return response?.data?.init; // Ensure response structure matches API
//     } catch (error) {
//       // Improve error handling for better debugging
//       throw new Error(error.response?.data?.error || error.message || 'An error occurred');
//     }
//   };

//   return useQuery({
//     queryKey,
//     queryFn,
//     enabled: !!id, // Ensures the query runs only when `id` is truthy
//     onError: (error) => {
//       console.error('Query Error:', error.message);
//     },
//     onSuccess: (data) => {
//       console.log('Query Success:', data);
//     },
//   });
// };

export const useQueryGetUser = () => {
  const queryKey = [queryKeys.getUserDetails];

  const queryFn = async () => {
    const tx = await sessionStorage.getItem(user_auth);
    return JSON.parse(tx);
  };

  return useQuery({
    queryKey,
    queryFn,
    onError: (error) => {
      console.error('Query Error:', error);
    },
    onSuccess: (data) => {
      console.log('Query Success:', data);
    },
  });
};

export const useQueryGetMintedTokenlist = () => {
  const { data: user } = useQueryGetUser();

  const queryKey = [queryKeys.getMintedList];

  const queryFn = async () => {
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `${endPoint}/mint/get-minted`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const tx = await axios.request(config);

    return tx?.data?.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    onError: (error) => {
      console.error('Query Error:', error);
    },
    onSuccess: (data) => {
      console.log('Query Success:', data);
    },
  });
};

// ==================== Get Transactioin ========================================

export const useQueryGetActiveResults = () => {
  const { data: user } = useQueryGetUser();

  const queryKey = [queryKeys.getActiveResults];

  const queryFn = async () => {
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `${endPoint}/user/get-user-data`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const tx = await axios.request(config);

    return tx?.data?.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    onError: (error) => {
      console.error('Query Error:', error);
    },
    onSuccess: (data) => {
      console.log('Query Success:', data);
    },
  });
};

//========================== list of details ====================

export const useQueryGetMarketPlaceList = () => {
  const { data: user } = useQueryGetUser();

  const queryKey = [queryKeys.getMarketPlaceList];

  const queryFn = async () => {
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `${endPoint}/mint/get-minted-properties`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const tx = await axios.request(config);

    return tx?.data?.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    onError: (error) => {
      console.error('Query Error:', error);
    },
    onSuccess: (data) => {
      console.log('Query Success:', data);
    },
  });
};

//========================== list of details ====================

export const useQueryGetTokenPercentage = () => {
  const { data: user } = useQueryGetUser();
  const { data: userData } = useQueryGetActiveResults();

  const queryKey = [queryKeys.getTokenPercentage];

  const queryFn = async () => {
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `${endPoint}/mint/monthly/divided`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
      data: userData?.userTokens,
    };

    const tx = await axios.request(config);
    return tx?.data?.data;
  };

  return useQuery({
    queryKey,
    queryFn,
    onError: (error) => {
      console.error('Query Error:', error);
    },
    onSuccess: (data) => {
      console.log('Query Success:', data);
    },
  });
};

export const useQueryGetTokenCopPrice = () => {
  const queryKey = [queryKeys.getTokenPercentageExchange];

  const queryFn = async () => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=COP`,
      headers: {
        Accept: 'application/json',
      },
    };

    const tx = await axios.request(config);
    return tx?.data?.COP;
  };

  return useQuery({
    queryKey,
    queryFn,
    onError: (error) => {
      console.error('Query Error:', error);
    },
    onSuccess: (data) => {
      console.log('Query Success:', data);
    },
    refetchInterval: 5000, // Fetch every 5 seconds
  });
};

export const useQueryGetExchangeList = () => {
  const queryKey = [queryKeys.getTokenListExchange];

  const queryFn = async () => {
    const config = {
      method: 'POST',
      url: `${endPoint}/blog/get-exchange`,
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
      console.error('Query Error:', error);
    },
    onSuccess: (data) => {
      console.log('Query Success:', data);
    },
    // refetchInterval: 5000, // Fetch every 5 seconds
  });
};
