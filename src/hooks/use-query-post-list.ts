import { getPostList } from "@/service/post";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const useQueryPostList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "5";

  return useQuery({
    queryKey: ["posts", page, limit],
    queryFn: () => getPostList(page, limit),
  });
};

export default useQueryPostList;
