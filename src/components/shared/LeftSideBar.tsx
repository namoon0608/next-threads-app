'use client';

import Link from 'next/link';
import Image from 'next/image';
import { sidebarLinks } from '@/constants';
import { usePathname, useRouter } from 'next/navigation';
import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/nextjs';

export default function LeftSideBar() {
    const route = useRouter();
    const pathname = usePathname();

    return (
        <>
            <section className="custom-scrollbar leftsidebar">
                <div className="flex w-full flex-1 flex-col gap-6 px-6">
                    {sidebarLinks.map((link) => {
                        const isActive =
                            (pathname.includes(link.route) &&
                                link.route.length > 1) ||
                            pathname === link.route;

                        return (
                            <Link
                                href={link.route}
                                key={link.label}
                                className={`leftsidebar_link ${
                                    isActive && 'bg-neutral-800'
                                }`}
                            >
                                <Image
                                    src={link.imgURL}
                                    alt={link.label}
                                    width={24}
                                    height={24}
                                />
                                <span className="text-light-1 max-lg:hidden">
                                    {link.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
                <div className="mt-10 px-6">
                    <SignedIn>
                        <SignOutButton
                            signOutCallback={() => route.push('/login')}
                        >
                            <div className="flex cursor-pointer gap-4 p-4">
                                <Image
                                    src="/assets/logout.png"
                                    alt="logout"
                                    width={24}
                                    height={24}
                                />
                                <p className="text-light-1 max-lg:hidden">
                                    Logout
                                </p>
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
            </section>
        </>
    );
}
