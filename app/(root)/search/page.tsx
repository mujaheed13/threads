import UserCard from "@/components/cards/UserCard";
import PostThread from "@/components/forms/PostThread";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(params.id);

//   if (!userInfo?.onboarding) redirect("/onboarding");

  const res = await fetchUsers({
    userId: user?.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });


  return (
    <section>
      <h1 className="head-text">Search</h1>

      <div className="mt-14 flex flex-col gap-9">
        {res?.users?.length === 0 ? (
          <p className="no-result">No users</p>
        ) : (
          <div className="">
            {
                res.users.map((person)=>{
                    return <UserCard 
                    key={person?.id}
                    id={person?.id}
                    name={person?.name}
                    username={person?.username}
                    imgUrl={person?.image}
                    personType='User'
                    />
                })
            }
          </div>
        )}
      </div>
    </section>
  );
}

export default Page;
