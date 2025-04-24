import { Experience } from "@advanced-react/server/database/schema";

import ErrorComponent from "@/features/shared/components/ErrorComponent";
import { trpc } from "@/router";

import { CommentCreateForm } from "./CommentCreateForm";
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
    return <ErrorComponent />;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Comments ({commentsCount})</h3>
      <CommentCreateForm experienceId={experienceId} />
      <CommentList
        comments={commentsQuery.data ?? []}
        isLoading={commentsQuery.isLoading}
      />
    </div>
  );
}
