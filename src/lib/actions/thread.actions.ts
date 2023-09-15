'use server';

import { revalidatePath } from 'next/cache';
import Thread from '../models/thread.model';
import User from '../models/user.model';
import { connect } from '../mongoose';

type Props = {
    text: string;
    author: string;
    communityId: string | null;
    path: string;
};

export async function createThread({ text, author, communityId, path }: Props) {
    try {
        connect();

        const createThread = await Thread.create({
            text,
            author,
            community: null,
        });

        //update user model
        await User.findByIdAndUpdate(author, {
            $push: {
                threads: createThread._id,
            },
        });

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    try {
        connect();

        //Calculate the number of posts to skip
        const skipAmount = (pageNumber - 1) * pageSize;

        //Fetch top-level posts
        const postsQuery = Thread.find({
            parentId: { $in: [null, undefined] },
        })
            .sort({ createAt: 'desc' })
            .skip(skipAmount)
            .limit(pageSize)
            .populate({
                path: 'author',
                model: User,
            })
            .populate({
                path: 'children',
                populate: {
                    path: 'author',
                    model: User,
                    select: '_id name parentId image',
                },
            });

        const totalPostsCount = await Thread.countDocuments({
            parentId: { $in: [null, undefined] },
        });

        const posts = await postsQuery.exec();

        const isNext = totalPostsCount > skipAmount + posts.length;

        return { posts, isNext };
    } catch (error: any) {
        throw new Error(`Failed to fetch posts: ${error.message}`);
    }
}

export async function fetchThread(id: string) {
    try {
        connect();

        const thread = await Thread.findById(id)
            .populate({
                path: 'author',
                model: User,
                select: '_id id name image',
            })
            .populate({
                path: 'children',
                populate: [
                    {
                        path: 'author',
                        model: User,
                        select: '_id id name parentId image',
                    },
                    {
                        path: 'children',
                        model: Thread,
                        populate: [
                            {
                                path: 'author',
                                model: User,
                                select: '_id id name parentId image',
                            },
                        ],
                    },
                ],
            })
            .exec();

        return thread;
    } catch (error: any) {
        throw new Error(`Failed to fetch thread: ${error.message}`);
    }
}

export async function createComment({
    threadId,
    commentText,
    userId,
    path,
}: {
    threadId: string;
    commentText: string;
    userId: string;
    path: string;
}) {
    try {
        connect();

        //Find the original thread by its id
        const originalThread = await Thread.findById(threadId);

        if (!originalThread) {
            throw new Error('Thread not found');
        }
        console.log(originalThread);

        //Create a new thread with the comment text
        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId,
        });

        //Save the new thread
        const savedCommentThread = await commentThread.save();

        //Update the original thread to include the new comment
        originalThread.children.push(savedCommentThread._id);

        //Save the original thread
        await originalThread.save();

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Failed to add comment: ${error.message}`);
    }
}
