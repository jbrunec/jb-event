import { Experience } from "@advanced-react/server/database/schema";

import { trpc } from "@/trpc";

import CommentList from "./CommentList";

type CommentSectionProps = {
  experienceId: Experience["id"];
  commentsCount: number;
};

export function CommentsSection({
  experienceId,
  commentsCount,
}: CommentSectionProps) {
  const commentsQuery = trpc.comments.byExperienceId.useQuery(
    { experienceId },
    {
      enabled: commentsCount > 0,
    },
  );

  if (commentsQuery.error) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Comments ({commentsCount})</h3>
      <CommentList
        comments={commentsQuery.data ?? []}
        isLoading={commentsQuery.isLoading}
      />
    </div>
  );
}
