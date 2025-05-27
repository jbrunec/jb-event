import Spinner from "@/features/shared/components/ui/Spinner";

import { UserForList } from "../types";
import { UserCard } from "./UserCard";

type UserListProps = {
  users: UserForList[];
  isLoading: boolean;
};

export function UserList({ users, isLoading }: UserListProps) {
  return (
    <div className="space-y-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      {isLoading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && users.length === 0 && (
        <div className="flex justify-center py-4">
          <p>No users found</p>
        </div>
      )}
    </div>
  );
}
