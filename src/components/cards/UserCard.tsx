'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

type CardProps = {
    id: string;
    name: string;
    username: string;
    imageUrl: string;
    personType: string;
};

export default function UserCard({
    id,
    name,
    username,
    imageUrl,
    personType,
}: CardProps) {
    const router = useRouter();

    return (
        <article className="user-card">
            <div className="user-card_avatar">
                <Image
                    src={imageUrl}
                    alt={name}
                    width={48}
                    height={48}
                    className="rounded-full"
                />
                <div className="flex-1 text-ellipsis">
                    <h4 className="text-light-1 text-base-semibold">{name}</h4>
                    <p className="text-small-medium text-light-1">
                        @{username}
                    </p>
                </div>
            </div>
            <Button
                className="user-card_btn"
                onClick={() => router.push(`/profile/${id}`)}
            >
                View
            </Button>
        </article>
    );
}
