import { fetchUser, getActivity } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default async function Activity() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo.onboarded) redirect('/onboarding');

    //Get activity
    const result = await getActivity(userInfo._id);

    console.log(result);

    return (
        <section>
            <h1 className="head-text mb-10">Activity</h1>

            <section className="mt-10 flex flex-col gap-5">
                {result.length > 0 ? (
                    <>
                        {result.map((data) => (
                            <Link
                                href={`/thread/${data.parentId}`}
                                key={data._id}
                            >
                                <article className="activity-card">
                                    <Image
                                        src={data.author.image}
                                        alt={data.author.name}
                                        width={20}
                                        height={20}
                                        className="rounded-full object-cover"
                                    />
                                    <p className="text-light-1 !text-small-regular">
                                        <span className="mr-1 text-primary-500">
                                            {data.author.name}
                                        </span>{' '}
                                        replied to your thread
                                    </p>
                                </article>
                            </Link>
                        ))}
                    </>
                ) : (
                    <p className="no-result !text-base-regular text-light-3">
                        No activity yet
                    </p>
                )}
            </section>
        </section>
    );
}
