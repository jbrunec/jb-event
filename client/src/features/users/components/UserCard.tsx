import { ReactNode } from "react";

import Card from "@/features/shared/components/ui/Card";
import Link from "@/features/shared/components/ui/Link";

import { UserWithUserContext } from "../types";
import UserAvatar from "./UserAvatar";

type UserCardProps = {
  user: UserWithUserContext;
  rightComponent?: (user: UserWithUserContext) => ReactNode;
};

export function UserCard({ user, rightComponent }: UserCardProps) {
  return (
    <Card className="flex items-center justify-between">
      <Link to="/users/$userId" params={{ userId: user.id }}>
        <UserAvatar user={user} showName={true} />
      </Link>
      {rightComponent && rightComponent(user)}
    </Card>
  );
}
