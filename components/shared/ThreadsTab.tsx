import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let res: any;

  if (accountType === "Community") {
    res = await fetchCommunityPosts(accountId);
  } else {
    res = await fetchUserPosts(accountId);
  }

  if (!res) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {res.threads?.map((thread: any) => {
        return (
          <ThreadCard
            key={thread?._id}
            id={thread?._id}
            parentId={thread?.parentId}
            content={thread?.text}
            author={
              accountType === "User"
                ? { name: res.name, image: res.image, id: res.id }
                : {
                    name: thread.author.name,
                    image: thread.author.image,
                    id: thread.author.id,
                  }
            }
            community={thread?.community} //TODO
            createdAt={thread?.createdAt}
            comments={thread?.children}
            currentUserId={currentUserId}
            isComment
          />
        );
      })}
    </section>
  );
};

export default ThreadsTab;
