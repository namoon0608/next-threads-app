'use client';

import Link from 'next/link';
import Image from 'next/image';
import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { dark } from '@clerk/themes';

function Navbar() {
    const route = useRouter();
    return (
        <>
            <nav className="topbar">
                <Link href={'/'} className="flex items-center gap-1">
                    <Image
                        src="/assets/logo-white.svg"
                        alt="logo"
                        width={32}
                        height={32}
                    />
                    <p className="text-heading3-bold text-light-1 max-xs:hidden">
                        Threads
                    </p>
                </Link>
                <div className="flex items-center gap-1">
                    <div className="block md:hidden text-light-1">
                        <SignedIn>
                            <SignOutButton
                                signOutCallback={() => route.push('/login')}
                            >
                                <div className="flex cursor-pointer">
                                    <Image
                                        src="/assets/logout.png"
                                        alt="logout"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            </SignOutButton>
                        </SignedIn>
                    </div>
                    <OrganizationSwitcher
                        appearance={{
                            baseTheme: dark,
                            elements: {
                                organizationSwitcherTrigger: 'py-2 px-4',
                            },
                        }}
                    />
                </div>
            </nav>
        </>
    );
}

export default Navbar;
