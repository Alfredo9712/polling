import { LucidePersonStanding } from "lucide-react";
import Image from "next/image";

interface AvatarProps {
  profileImg: string | null | undefined;
}

export default function Avatar({ profileImg }: AvatarProps) {
  return (
    <div className="relative w-7 h-7 ">
      {profileImg ? (
        <Image
          referrerPolicy="no-referrer"
          src={profileImg ?? "/images/avatar.png"}
          alt="image of user"
          fill
          className="rounded-full"
        />
      ) : (
        <LucidePersonStanding />
      )}
    </div>
  );
}
