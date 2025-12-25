import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/service/post";
import { useParams } from "next/navigation";

const useQueryPost = () => {
  const { id } = useParams();

  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id as string),
  });
};

export default useQueryPost;
