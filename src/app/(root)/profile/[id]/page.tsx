import ProfileHeader from '@/components/shared/ProfileHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { profileTabs } from '@/constants';
import Image from 'next/image';
import ThreadsTab from '@/components/shared/ThreadsTab';

export default async function ProfileId({
    params,
}: {
    params: { id: string };
}) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(params.id);
    if (!userInfo.onboarded) redirect('/onboarding');

    return (
        <section>
            <ProfileHeader
                authUserId={user.id}
                accountId={userInfo.id}
                name={userInfo.name}
                username={userInfo.username}
                image={userInfo.image}
                bio={userInfo.bio}
            />

            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {profileTabs.map((tab) => {
                            return (
                                <TabsTrigger
                                    value={tab.value}
                                    key={tab.value}
                                    className="tab"
                                >
                                    <Image
                                        src={tab.icon}
                                        alt={tab.value}
                                        width={24}
                                        height={24}
                                        className="object-contain"
                                    />
                                    <p className="max-sm:hidden">{tab.label}</p>

                                    {tab.label === 'Threads' && (
                                        <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                            {userInfo.threads.length}
                                        </p>
                                    )}
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>
                    {profileTabs.map((tab) => (
                        <TabsContent
                            key={`content${tab.label}`}
                            value={tab.value}
                            className="w-full text-light-1"
                        >
                            <ThreadsTab
                                accountId={userInfo.id}
                                accountType="User"
                                currentUserId={user.id}
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
}
