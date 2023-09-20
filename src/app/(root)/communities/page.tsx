import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function Communities() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    return (
        <section>
            <h1 className="head-text">Communities</h1>

            <section className="mt-9 flex flex-wrap gap-4"></section>
        </section>
    );
}
