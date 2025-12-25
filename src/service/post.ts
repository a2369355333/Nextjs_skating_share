export const getPost = async (id: string) => {
  const res = await fetch(`/api/post/detail?id=${id}`);
  const resData = await res.json();
  return resData.data;
};

export const getPostList = async (page: string, limit: string) => {
  const res = await fetch(`/api/post/list?page=${page}&limit=${limit}`);
  const resData = await res.json();
  return resData.data;
};

export const addPost = async (data: { 
  title: string; 
  content: string; 
  image: File | null; 
  imageDimensions: { width: number; height: number } | null
}) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  if(data.image) {
    formData.append('image', data.image);

    if(data.imageDimensions) {
      formData.append('width', data.imageDimensions.width.toString());
      formData.append('height', data.imageDimensions.height.toString());
    }
  }

  const res = await fetch(`/api/post/add`, {
    method: "POST",
    body: formData,
  });
  const resData = await res.json();
  return resData.data;
};
