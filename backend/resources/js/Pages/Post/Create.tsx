import React from "react";
import { Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

// Define the types for form data and errors
interface FormData {
    title: string;
    description: string;
}

interface FormErrors {
    title?: string;
    description?: string;
}

const Create = ({ auth }: PageProps) => {
    const { data, setData, errors, post } = useForm<FormData>({
        title: "",
        description: "",
    });

    // Handle form submission
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route("posts.store"));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
                <div className="container mx-auto max-w-7xl">
                    <div>
                        <h1 className="mb-8 text-3xl font-bold mt-8">
                            <Link
                                href={route("posts.index")}
                                className="text-blue-600 font-bold hover:text-blue-700"
                            >
                                Posts
                            </Link>
                            <span className="font-medium text-blue-600"> / </span>
                            Create
                        </h1>
                    </div>
                    <div className="max-w-6xl p-8 bg-white rounded shadow">
                        <form name="createForm" onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        name="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                    />
                                    {errors.title && (
                                        <span className="text-red-600 text-sm">
                                            {errors.title}
                                        </span>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-gray-700">Description</label>
                                    <textarea
                                        id="description"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData("description", e.target.value)
                                        }
                                    />
                                    {errors.description && (
                                        <span className="text-red-600 text-sm">
                                            {errors.description}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="px-3 py-1.5  text-white bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
           
        </AuthenticatedLayout>
    );
};

export default Create;