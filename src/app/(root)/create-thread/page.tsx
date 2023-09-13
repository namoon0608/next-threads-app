import { fetchUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function CreateThread() {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    console.log(userInfo);

    return (
        <>
            <h1 className="head-text">Create Thread</h1>
        </>
    );
}
