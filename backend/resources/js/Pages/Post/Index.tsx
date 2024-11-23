import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

// Define the type for a single post
interface Post {
    id: number;
    title: string;
    description: string;
}

// Adjust the type to reflect the correct structure of posts
interface Posts {
    data: Post[];
}

const Index = ({ auth }: PageProps) => {
    const { posts } = usePage().props as { posts: Post[] }; // Type casting pour s'assurer que 'posts' est bien un tableau de 'Post'

    
    const data: Post[] = posts; 
    console.log(posts); // Check the structure in the console

    // Function to handle delete action
    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this post?")) {
            router.delete(route("posts.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <div className="container mx-auto max-w-7xl mt-4">
                <h1 className="mb-8 text-4xl font-bold text-center">Posts Index</h1>
                <div className="flex items-center justify-between mb-6">
                    <Link 
                        className="px-3 py-1.5 text-white bg-blue-500 rounded-md focus:outline-none"
                        href={route("posts.create")}
                    >
                        Create Post
                    </Link >
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold">
                                    #
                                </th>
                                <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold">
                                    Title
                                </th>
                                <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold">
                                    Description
                                </th>
                                <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map(({ id, title, description }) => (
                                    <tr key={id}>
                                        <td className="px-4 py-2 border-b border-gray-300">
                                            {id}
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-300">
                                            {title}
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-300">
                                            {description}
                                        </td>
                                        <td className="px-4 py-2 border-b border-gray-300">
                                            <Link 
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs mr-1"
                                                href={route("posts.edit", { id: Number(id) })}
                                            >
                                                Edit
                                            </Link>
                                            <button 
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                                                onClick={() => handleDelete(Number(id))} // Trigger delete function
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        className="px-4 py-2 border-b border-gray-300"
                                        colSpan={4}
                                    >
                                        No posts found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
