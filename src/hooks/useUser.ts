
// This is a placeholder hook to simulate fetching user data.
// In a real application, you would fetch this from your authentication provider or backend.
export const useUser = () => {
    return {
        user: {
            id: "user-4",
            name: "Sarah Chen",
            email: "sarah.chen@example.com",
            avatarUrl: "https://picsum.photos/seed/avatar4/40/40",
            isVerified: true, // Change this to false to see the unverified state
            country: "Canada", // This would be determined for the logged-in user
        }
    }
}
