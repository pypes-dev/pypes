"use client"
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Post } from '@/payload-types';

interface BlogPostProps {
    posts: Post[];
}

const getReadTime = (content: any) => {
    if (!content?.root?.children) return 3;
    const text = content.root.children
        .map((child: any) => child.children?.map((c: any) => c.text).join(' ') || '')
        .join(' ');
    const wordCount = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
};

export function BlogPosts({ posts }: BlogPostProps) {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="my-16 bg-gradient-to-b from-gray-50 to-white rounded shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="text-blue-600">Latest</span>
                    </h2>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                        Discover our latest articles and stay updated with the newest trends and insights.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                    {posts.map((post) => {
                        return (
                            <SingleBlogCard post={post} key={post.id} />
                        );
                    })}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="/blog/posts"
                        className="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        aria-label="View all articles"
                    >
                        Explore All Articles
                    </Link>
                </div>
            </div>
        </section>
    );
}

export const SingleBlogCard = ({ post }: { post: Post }) => {
    const readTime = getReadTime(post.content);
    const imageUrl = 'https://i.postimg.cc/Fd7JkGjV/wavy-p.jpg';
    const imageAlt = 'Pypes wavy P logo';

    return (
        <article
            key={post.id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            itemScope
            itemType="http://schema.org/BlogPosting"
            onClick={() => window.location.href = `/blog/posts/${post.slug}`}
        >
            <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={imageAlt}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-8 flex-1 flex flex-col">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-4 w-full">
                    <time
                        className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full w-full"
                        dateTime={post.publishedAt || ''}
                        itemProp="datePublished"
                    >
                        <Calendar className="w-4 h-4 mr-1.5 text-blue-500" aria-hidden="true" />
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: '2-digit',
                            day: '2-digit',
                            year: '2-digit'
                        }) : 'Soon'}
                    </time>
                    <span className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full w-full">
                        <Clock className="w-4 h-4 mr-1.5 text-blue-500" aria-hidden="true" />
                        {readTime} min
                    </span>
                </div>

                <h3
                    className="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-blue-600 transition-colors duration-200"
                    itemProp="headline"
                >
                    {post.title}
                </h3>

                {post.meta?.description && (
                    <p
                        className="text-gray-600 mb-4 flex-1"
                        itemProp="description"
                    >
                        {post.meta.description}
                    </p>
                )}

            </div>
        </article>
    )
}