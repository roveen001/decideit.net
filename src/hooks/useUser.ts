
// This is a placeholder hook to simulate fetching user data.
// In a real application, you would fetch this from your authentication provider or backend.
export const useUser = () => {
    return {
        user: {
            name: "Guest User",
            email: "guest@example.com",
            avatarUrl: "https://picsum.photos/seed/user-profile/40/40",
            isVerified: true, // Change this to false to see the unverified state
            country: "USA", // This would be determined for the logged-in user
        }
    }
}
