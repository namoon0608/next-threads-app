'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
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
import { CommentValidation } from '@/lib/validations/thread';
import Image from 'next/image';
import { createComment } from '@/lib/actions/thread.actions';

type CommentProps = {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
};

export default function Comment({
    threadId,
    currentUserImg,
    currentUserId,
}: CommentProps) {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: '',
        },
    });

    async function onSubmit(values: z.infer<typeof CommentValidation>) {
        await createComment({
            threadId,
            commentText: values.thread,
            userId: currentUserId,
            path: pathname,
        });

        form.reset();
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="comment-form flex items-center"
                >
                    <FormField
                        control={form.control}
                        name="thread"
                        render={({ field }) => (
                            <FormItem className="flex gap-3 w-full items-center">
                                <FormLabel>
                                    <Image
                                        src={currentUserImg}
                                        alt="User Image"
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover"
                                    />
                                </FormLabel>
                                <FormControl className="border-none bg-transparent">
                                    <Input
                                        type="text"
                                        placeholder="Comment..."
                                        className="no-focus resize-none text-light-1 outline-none"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="comment-form_btn">
                        Reply
                    </Button>
                </form>
            </Form>
        </div>
    );
}
