import { fetchUserPosts } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import ThreadCard from '../cards/ThreadCard';

type TabProps = {
    currentUserId: string;
    accountId: string;
    accountType: string;
};

export default async function ThreadsTab({
    currentUserId,
    accountId,
    accountType,
}: TabProps) {
    //Fetch profile threads
    const posts = await fetchUserPosts(accountId);

    if (!posts) redirect('/');

    return (
        <section className="mt-9 flex flex-col gap-10">
            {posts.threads.map((thread: any) => (
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={currentUserId}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={
                        accountType === 'User'
                            ? {
                                  name: posts.name,
                                  image: posts.image,
                                  id: posts.id,
                              }
                            : {
                                  name: thread.author.name,
                                  image: thread.author.image,
                                  id: thread.author.id,
                              }
                    }
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                />
            ))}
        </section>
    );
}
