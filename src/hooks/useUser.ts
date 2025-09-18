
"use client";

import { useState, useEffect } from 'react';
import type { User } from '@/lib/types';

const MOCK_USER: User = {
    id: "user-4",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    avatarUrl: "https://picsum.photos/seed/avatar4/40/40",
    isVerified: true, // Change this to false to see the unverified state
    country: "Canada", // This would be determined for the logged-in user
};

// This is a placeholder hook to simulate fetching user data and auth state.
// In a real application, you would fetch this from your authentication provider or backend.
export const useUser = () => {
    const [isSignedIn, setIsSignedIn] = useState(true);
    const [user, setUser] = useState<User | null>(MOCK_USER);

    useEffect(() => {
        const storedAuthState = localStorage.getItem('isSignedIn');
        if (storedAuthState) {
            const signedIn = JSON.parse(storedAuthState);
            setIsSignedIn(signedIn);
            setUser(signedIn ? MOCK_USER : null);
        }
    }, []);

    const signIn = () => {
        setIsSignedIn(true);
        setUser(MOCK_USER);
        localStorage.setItem('isSignedIn', JSON.stringify(true));
    };

    const signOut = () => {
        setIsSignedIn(false);
        setUser(null);
        localStorage.setItem('isSignedIn', JSON.stringify(false));
    };

    return {
        user,
        isSignedIn,
        signIn,
        signOut,
    }
}
