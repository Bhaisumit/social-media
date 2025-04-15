import { useQuery } from "@tanstack/react-query";
import { Post } from "./PostList";
import { supabase } from "../supabase-client";
import { PostItem } from "./PostItem";

interface Props{
    communityId:number;
} 


interface PostWithCommunity extends Post{
    communities: {
        name: string;
    };

}

 export const fetchCommunityPost = async (communityId:number): Promise<PostWithCommunity[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select("* , communities(name)")
    .eq("community_id", communityId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as PostWithCommunity[];
};
export  const CommunityDisplay=({communityId}:Props)=>{
    const { data, error, isLoading } = useQuery<PostWithCommunity[], Error>({
        queryKey: ["communityPost", communityId],
        queryFn: ()=>fetchCommunityPost(communityId),
      });
    
      if (isLoading) {
        return <div>Loading Communities...</div>;
      }
    
      if (error) {
        return <div>Error:{error.message}</div>;
      }
    return (
        <div>
            <h2 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            { data && data[0].communities.name}Community posts</h2>

            {data && data.length>0 ?(<div>
                {data.map((post,key)=>(<PostItem key={key} post={post}/>))}
                </div>):(<p>No posts in  community yet</p>)}
        </div>
    )
}