import React from "react";

// Définir le type des props attendues
interface AuthenticatedLayoutProps {
    user: {
        id: number;
        name: string;
        email: string;
    };
    header: React.ReactNode;
    children: React.ReactNode;
}

const AuthenticatedLayout = ({ user, header, children }: AuthenticatedLayoutProps) => {
    return (
        <div>
            <header>
                {header}
            </header>
            <main>
                <h1>Welcome, {user.name}</h1>
                {children}
            </main>
        </div>
    );
};

export default AuthenticatedLayout;
