import { cn } from "@/lib/utils";
import type { User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CheckBadgeIcon } from "./CheckBadgeIcon";

type UserAvatarProps = {
  user: User;
  className?: string;
};

export default function UserAvatar({ user, className }: UserAvatarProps) {
  return (
    <div className="relative">
      <Avatar className={cn("h-10 w-10", className)}>
        <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      {user.isVerified && (
        <div className="absolute -bottom-1 -right-1">
            <CheckBadgeIcon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
