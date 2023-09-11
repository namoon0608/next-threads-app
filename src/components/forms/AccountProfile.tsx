'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserValidation } from '@/lib/validations/user';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { ChangeEvent } from 'react';

type ProfileProps = {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
};

export default function AccountProfile({ user, btnTitle }: ProfileProps) {
    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: '',
            name: '',
            username: '',
            bio: '',
        },
    });

    function onSubmit(values: z.infer<typeof UserValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    function handleImg(e: ChangeEvent, fieldChange: (value: string) => void) {
        e.preventDefault();
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col justify-start gap-10"
                >
                    <FormField
                        control={form.control}
                        name="profile_photo"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-4">
                                <FormLabel className="account-form_image-label">
                                    {field.value ? (
                                        <Image
                                            src={field.value}
                                            alt="profile photo"
                                            width={96}
                                            height={96}
                                            priority
                                            className="rounded-full object-contain"
                                        />
                                    ) : (
                                        <Image
                                            src="/assets/profile.png"
                                            alt="profile photo"
                                            width={24}
                                            height={24}
                                            className="object-contain"
                                        />
                                    )}
                                </FormLabel>
                                <FormControl className="flex-1 text-base-semibold text-gray-200">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        placeholder="Upload a photo"
                                        className="account-form_image-input"
                                        onChange={(e) =>
                                            handleImg(e, field.onChange)
                                        }
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
    );
}
