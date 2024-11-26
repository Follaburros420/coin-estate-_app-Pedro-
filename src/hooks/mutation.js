// import createProperty from '@/app/server/property/action';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { endPoint, user_auth } from './queryContants';
// import createBlog from '@/app/server/blog/action';
// import getBlogsList from '@/app/server/blog/deleteBlog';
// import createProperty from '@/app/api/v2/property/action';

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
    onSuccess: (res) => {

    },
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
      console.log("🚀 ~ useMutateUploadFiles ~ res:", res);
      toast.error(res?.reason);
    },
    onSuccess: (res) => {
      console.log("Uploaded Files: ", res);
    },
  });
};

// ================================================= Delete Blog ==================================

export const useMutateCreateBlog = () => {

  const mutationFn = async (data) => {
    if (!data) throw new Error("Blog data is required for creation.");

    const config = {
      method: "POST", // Use DELETE method for deletion
      url: `${endPoint}/blog/action`, // Update to the correct deletion endpoint
      headers: {
        Accept: "application/json",
      },
      data: data, // Pass the ID in the request body
    };

    const response = await axios.request(config);
    return response.data;
  };

  return useMutation({
    mutationFn,
    onError: (res) => {
      console.log({ res })
      toast.error(`Error: ${res}`);
    },
    onSuccess: (res) => {
      console.log({ res })
      toast.success('Blog Created Successfully');
    },
  });
};


export const useMutateDeleteBlog = (onSuccess) => {
  const mutationFn = async (id) => {
    if (!id) throw new Error("Blog ID is required for deletion.");

    const config = {
      method: "DELETE", // Use DELETE method for deletion
      url: `${endPoint}/blog/deleteBlog`, // Update to the correct deletion endpoint
      headers: {
        Accept: "application/json",
      },
      data: { id }, // Pass the ID in the request body
    };

    const response = await axios.request(config);
    return response.data;
  };

  return useMutation({
    mutationFn,
    onError: (error) => {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog. Please try again.");
    },
    onSuccess: (data) => {
      onSuccess()
      console.log("Delete response:", data);
      toast.success("Blog deleted successfully!");
    },
  });
};

export const useMutateUpdateBlog = (onSuccess) => {
  const mutationFn = async (data) => {
    if (!data?.id) throw new Error("Blog ID and updated data are required for updating.");

    const config = {
      method: "PUT", // Use PUT or PATCH for updating
      url: `${endPoint}/blog/update`, // Update to the correct update endpoint
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: { id:data?.id, ...data }, // Include ID and updated data in the request body
    };

    const response = await axios.request(config);
    return response?.data;
  };

  return useMutation({
    mutationFn,
    onError: (error) => {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog. Please try again.");
    },
    onSuccess: (data) => {
      if (onSuccess) onSuccess();
      console.log("Update response:", data);
      toast.success("Blog updated successfully!");
    },
  });
};

// ============================================ Property Queries ========================================


export const useMutateCreateProperty = () => {
  const mutationFn = async (data) => {
    if (!data) throw new Error("Property data is required for creation.");

    const config = {
      method: "POST", // Use DELETE method for deletion
      url: `${endPoint}/property/create-action`, // Update to the correct deletion endpoint
      headers: {
        Accept: "application/json",
      },
      data: data, // Pass the ID in the request body
    };

    const response = await axios.request(config);
    return response.data;
  };


  return useMutation({
    mutationFn,
    onError: (error) => {
      const message = error.message || "An unexpected error occurred.";
      console.error("Mutation error:", message);
      toast.error(`Failed to create property: ${message}`);
    },
    onSuccess: (res) => {
      console.log("Mutation success:", res);
      toast.success(`Property created successfully!`);
    },
  });
};


// PUT


export const useMutateLocalUser = () => {

  const mutationFn = async (value) => {
    return localStorage.setItem(user_auth, JSON.stringify(value))
  };

  return useMutation({
    mutationFn,
    onError: (res) => {
      console.log({ res })
    },
    onSuccess: (res) => {
    },
  });
};
