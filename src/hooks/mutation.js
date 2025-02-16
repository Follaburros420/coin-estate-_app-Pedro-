// import createProperty from '@/app/server/property/action';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { endPoint, user_auth } from './queryContants';
import { useParams, useRouter } from 'next/navigation';
import { useQueryGetUser } from './query';
import { usePropertyStates } from '@/store/useProduct';
// import createBlog from '@/app/server/blog/action';
// import getBlogsList from '@/app/server/blog/deleteBlog';
// import createProperty from '@/app/api/v2/property/action';

export const useMutateLocalUser = () => {
  const mutationFn = async (value) => {
    return sessionStorage.setItem(user_auth, JSON.stringify(value));
  };

  return useMutation({
    mutationFn,
    onError: (res) => {
      console.log({ res });
    },
    onSuccess: (res) => {},
  });
};

export const useMutateLogout = () => {
  const mutationFn = async () => {
    return sessionStorage.removeItem(user_auth);
  };

  return useMutation({
    mutationFn,
    onError: (res) => {
      console.log({ res });
    },
    onSuccess: (res) => {},
  });
};

// ================================== pinata albums ==========================

export const useMutateUploadFiles = () => {
  const mutationFn = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const pinataMetadata = JSON.stringify({
      name: `${file.name}`,
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', pinataOptions);

    const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT_TOKEN}`,
      },
    });
    return res.data;
  };

  return useMutation({
    mutationFn,
    onError: (res) => {
      toast.error(res?.reason);
    },
    onSuccess: (res) => {},
  });
};

// ======================= send multiple Images ===============================

export const useMutateUploadMultiFiles = () => {
  const mutationFn = async (files) => {
    const uploadedFiles = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      const pinataMetadata = JSON.stringify({
        name: `${file.name}`,
      });
      formData.append('pinataMetadata', pinataMetadata);

      const pinataOptions = JSON.stringify({
        cidVersion: 0,
      });
      formData.append('pinataOptions', pinataOptions);

      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT_TOKEN}`,
        },
      });

      uploadedFiles.push(res.data.IpfsHash);
    }

    return uploadedFiles;
  };

  return useMutation({
    mutationFn,
    onError: (res) => {
      console.log('🚀 ~ useMutateUploadFiles ~ res:', res);
      toast.error(res?.reason);
    },
    onSuccess: (res) => {
      console.log('Uploaded Files: ', res);
    },
  });
};

// ================================================= Delete Blog ==================================

export const useMutateCreateBlog = () => {
  const { data: user } = useQueryGetUser();

  const mutationFn = async (data) => {
    if (!data) throw new Error('Blog data is required for creation.');

    const config = {
      method: 'POST', // Use DELETE method for deletion
      url: `${endPoint}/blog/action`, // Update to the correct deletion endpoint
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
      data: { ...data, email: user?.email }, // Pass the ID in the request body
    };

    const response = await axios.request(config);
    return response.data;
  };

  return useMutation({
    mutationFn,
    onError: (res) => {
      console.log({ res });
      toast.error(`Error: ${res.response.data.error}`);
    },
    onSuccess: (res) => {
      console.log({ res });
      toast.success('Blog Created Successfully');
    },
  });
};

export const useMutateDeleteBlog = (onSuccess) => {
  const { data: user } = useQueryGetUser();

  const mutationFn = async (id) => {
    if (!id) throw new Error('Blog ID is required for deletion.');

    const config = {
      method: 'DELETE', // Use DELETE method for deletion
      url: `${endPoint}/blog/deleteBlog`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
      data: { id }, // Pass the ID in the request body
    };

    const response = await axios.request(config);
    return response.data;
  };

  return useMutation({
    mutationFn,
    onError: (error) => {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog. Please try again.');
    },
    onSuccess: (data) => {
      onSuccess();
      console.log('Delete response:', data);
      toast.success('Blog deleted successfully!');
    },
  });
};

export const useMutateUpdateBlog = (onSuccess) => {
  const { data: user } = useQueryGetUser();

  const mutationFn = async (data) => {
    if (!data?.id) throw new Error('Blog ID and updated data are required for updating.');

    const config = {
      method: 'PUT', // Use PUT or PATCH for updating
      url: `${endPoint}/blog/update`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
      data: { id: data?.id, ...data, email: user?.email },
    };

    const response = await axios.request(config);
    return response?.data;
  };

  return useMutation({
    mutationFn,
    onError: (error) => {
      console.log('Error updating blog:', error);
      toast.error('Failed to update blog. Please try again.');
    },
    onSuccess: (data) => {
      if (onSuccess) onSuccess();
      console.log('Update response:', data);
      toast.success('Blog updated successfully!');
    },
  });
};

// ============================================ Property Queries ========================================

export const useMutateCreateProperty = () => {
  const { data: user } = useQueryGetUser();

  const mutationFn = async (data) => {
    if (!data) throw new Error('Property data is required for creation.');

    const config = {
      method: 'POST', // Use DELETE method for deletion
      url: `${endPoint}/property/create-action`, // Update to the correct deletion endpoint
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
      data: data, // Pass the ID in the request body
    };

    const response = await axios.request(config);
    return response.data;
  };

  return useMutation({
    mutationFn,
    onError: (error) => {
      const message = error.message || 'An unexpected error occurred.';
      console.error('Mutation error:', message);
      toast.error(`Failed to create property: ${message}`);
    },
    onSuccess: (res) => {
      console.log('Mutation success:', res);
      toast.success(`Property created successfully!`);
    },
  });
};

// ============================================ Register User ========================================

export const useMutateRegisterUser = () => {
  const router = useRouter();
  const mutationFn = async (data) => {
    if (!data) throw new Error('Property data is required for creation.');

    const config = {
      method: 'POST', // Use DELETE method for deletion
      url: `${endPoint}/auth/signup`, // Update to the correct deletion endpoint
      headers: {
        Accept: 'application/json',
      },
      data: data, // Pass the ID in the request body
    };

    const response = await axios.request(config);
    return response.data;
  };

  return useMutation({
    mutationFn,
    onError: (error) => {
      const message = error?.response?.data?.error || 'An unexpected error occurred.';
      console.log('Mutation error:', error?.response?.data?.error);
      toast.error(`Failed: ${message}`);
    },
    onSuccess: (res) => {
      router.push('/auth/log-in');
      console.log('Mutation success:', res);
      toast.success(`${res?.message}`);
    },
  });
};

// ============================================ Login User ========================================

export const useMutateLoginUser = () => {
  const router = useRouter();
  const { mutate: localUser } = useMutateLocalUser();
  const mutationFn = async (data) => {
    if (!data) throw new Error('Property data is required for creation.');

    const config = {
      method: 'POST', // Use DELETE method for deletion
      url: `${endPoint}/auth/signin`, // Update to the correct deletion endpoint
      headers: {
        Accept: 'application/json',
      },
      data: data, // Pass the ID in the request body
    };

    const response = await axios.request(config);
    return response.data;
  };

  return useMutation({
    mutationFn,
    onError: (error) => {
      const message = error.message || 'An unexpected error occurred.';
      console.log('Mutation error:', error.response.data);
      toast.error(`Login Fail: ${error.response.data.error}`);
    },
    onSuccess: (res) => {
      console.log('Mutation success:', res);
      router.push('/');
      localUser(res);
      toast.success(`Login Success`);
    },
  });
};

// ======================= Testing Section ====================================

export const useMutateTransferFunds = () => {
  const { data: user } = useQueryGetUser();

  const mutationFn = async ({ address, amount }) => {
    if (!address) throw new Error('Property data is required for creation.');

    const config = {
      method: 'POST', // Use DELETE method for deletion
      url: `${endPoint}/userInstants/send-token`, // Update to the correct deletion endpoint
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
      data: {
        tokenAddress: address,
        amount: amount,
      }, // Pass the ID in the request body
    };

    const response = await axios.request(config);
    return response.data;
  };

  return useMutation({
    mutationFn,
    enabled: !!user?.email,
    onError: (res) => {
      console.log({ error: res?.response?.data?.error, res });
      const message = res?.response?.data?.error;
      console.log({ message });
      toast.error(`Error: ${message}`);
      // toast.error(`Error: ${res?.response?.data?.error}`);
    },
    onSuccess: (res) => {
      toast.success(`${res?.message} Transaction Hash:${res.transactionHash}`);
    },
  });
};

// ============================= list Minted ==========================

export const useMutateMinteToken = () => {
  const { data: user } = useQueryGetUser();

  const mutationFn = async (data) => {
    if (!data) throw new Error('Property data is required for creation.');

    const config = {
      method: 'POST', // Use DELETE method for deletion
      url: `${endPoint}/mint/mint-token`, // Update to the correct deletion endpoint
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
      data: data, // Pass the ID in the request body
    };

    const response = await axios.request(config);
    return response.data;
  };

  return useMutation({
    mutationFn,
    onError: (error) => {
      console.log({ error });
      const message = error.message || 'An unexpected error occurred.';
      console.error('Mutation error:', message);
      toast.error(`Failed to create property: ${message}`);
    },
    onSuccess: (res) => {
      console.log('Mutation success:', res);
      // toast.success(`Property created successfully!`);
    },
  });
};

// ====================

export const useMutatePDUpdate = () => {
  const router = useRouter();
  const { data: user } = useQueryGetUser();

  const mutationFn = async (id) => {
    if (!id) throw new Error('Property data is required for creation.');

    const config = {
      method: 'POST',
      url: `${endPoint}/userInstants/update-b-details`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
      data: { id },
    };

    const response = await axios.request(config);
    return response?.data;
  };

  return useMutation({
    mutationFn,
    onError: (error) => {
      console.log({ error });
      const message = error.message || 'An unexpected error occurred.';
      console.error('Mutation error:', message);
      toast.error(`Failed to create property: ${message}`);
    },
    onSuccess: (res) => {
      console.log('Mutation success:', res);
      toast.success(`${res?.message}`);
      router.back();
    },
  });
};

export const useMutationInitiatePayment = (onSuccess) => {
  const router = useRouter();
  const params = useParams();
  const setInitailPropert = usePropertyStates((state) => state.setInitailPropert);

  const { data: user } = useQueryGetUser();

  const mutationFn = async ({ id, amount }) => {
    if (!id) {
      throw new Error('Property ID is required');
    }

    try {
      const config = {
        method: 'POST',
        url: `${endPoint}/userInstants/create-payment-intent`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        data: { id, amount: Number(amount) }, // Correctly pass the body as `data` in axios
      };

      const response = await axios.request(config);

      // Axios doesn't have an `ok` property; check `status` instead
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Error: ${response.status} - ${response.statusText || 'Unknown error'}`);
      }

      return response?.data; // Ensure response structure matches API
    } catch (error) {
      // Improve error handling for better debugging
      throw new Error(error.response?.data?.error || error.message || 'An error occurred');
    }
  };

  return useMutation({
    mutationFn,
    onError: (error) => {
      console.log({ error });
      const message = error.message || 'An unexpected error occurred.';
      console.error('Mutation error:', message);
      toast.error(`Failed to create property: ${message}`);
    },
    onSuccess: (res) => {
      if (res?.message) {
        onSuccess();
        setInitailPropert(res);
        console.log('Mutation success:', res);
      }
    },
  });
};

export const useMutationMonthlyProcess = (onSuccess) => {
  const router = useRouter();
  const params = useParams();

  const { data: user } = useQueryGetUser();

  const mutationFn = async (data) => {
    if (!data) {
      throw new Error('Invalite amount is required');
    }

    try {
      const config = {
        method: 'POST',
        url: `${endPoint}/mint/monthly/set-amount`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        data: data, // Correctly pass the body as `data` in axios
      };

      const response = await axios.request(config);

      // Axios doesn't have an `ok` property; check `status` instead
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Error: ${response.status} - ${response.statusText || 'Unknown error'}`);
      }

      return response?.data; // Ensure response structure matches API
    } catch (error) {
      // Improve error handling for better debugging
      throw new Error(error.response?.data?.error || error.message || 'An error occurred');
    }
  };

  return useMutation({
    mutationFn,
    onError: (error) => {
      console.log({ error });
      const message = error.message || 'An unexpected error occurred.';
      console.error('Mutation error:', message);
      toast.error(`Failed to create property: ${message}`);
    },
    onSuccess: (res) => {
      if (res?.message) {
        onSuccess();
        toast.success('success');
        console.log('Mutation success:', res);
      }
    },
  });
};
