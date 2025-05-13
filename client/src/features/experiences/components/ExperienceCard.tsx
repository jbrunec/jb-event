import { LinkIcon, MessageSquare } from "lucide-react";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Button } from "@/features/shared/components/ui/Button";
import Card from "@/features/shared/components/ui/Card";
import Link from "@/features/shared/components/ui/Link";
import UserAvatar from "@/features/users/components/UserAvatar";

import { ExperienceForList } from "../types";

type ExperienceCardProps = {
  experience: ExperienceForList;
};

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <ExperienceCardMedia experience={experience} />
      <div className="flex items-start gap-4 p-4">
        <ExperienceCardAvatar experience={experience} />
        <div className="w-full space-y-4">
          <ExperienceCardHeader experience={experience} />
          <ExperienceCardContent experience={experience} />
          <ExperienceCardMeta experience={experience} />
          <ExperienceCardMetricButtons experience={experience} />
          <ExperienceCardActionButtons experience={experience} />
        </div>
      </div>
    </Card>
  );
}

type ExperienceCardMediaProps = Pick<ExperienceCardProps, "experience">;

function ExperienceCardMedia({ experience }: ExperienceCardMediaProps) {
  if (!experience.imageUrl) {
    return null;
  }

  return (
    <div className="aspect-video w-full">
      <img
        src={experience.imageUrl}
        alt={experience.title}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

type ExperienceCardHeaderProps = Pick<ExperienceCardProps, "experience">;

function ExperienceCardHeader({ experience }: ExperienceCardHeaderProps) {
  return (
    <div>
      <Link
        to="/users/$userId"
        params={{ userId: experience.user.id }}
        variant="ghost"
      >
        <div>{experience.user.name}</div>
      </Link>
      <Link
        to={`/experiences/$experienceId`}
        params={{ experienceId: experience.id }}
      >
        <h2 className="text-xl font-bold">{experience.title}</h2>
      </Link>
    </div>
  );
}

type ExperienceCardContentProps = Pick<ExperienceCardProps, "experience">;

function ExperienceCardContent({ experience }: ExperienceCardContentProps) {
  return <p>{experience.content}</p>;
}

type ExperienceCardMetaProps = Pick<ExperienceCardProps, "experience">;

function ExperienceCardMeta({ experience }: ExperienceCardMetaProps) {
  return (
    <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
      <time>{new Date(experience.scheduledAt).toLocaleString()}</time>
      {experience.url && (
        <div className="flex items-center gap-2">
          <LinkIcon
            size={16}
            className="text-secondary-500 dark:text-primary-500"
          />
          <a
            href={experience.url}
            target="_blank"
            className="text-secondary-500 dark:text-primary-500"
          >
            Event Details
          </a>
        </div>
      )}
    </div>
  );
}

type ExperienceCardMetricButtonsProps = Pick<ExperienceCardProps, "experience">;

function ExperienceCardMetricButtons({
  experience,
}: ExperienceCardMetricButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="link" asChild>
        <Link
          to="/experiences/$experienceId"
          params={{ experienceId: experience.id }}
          variant="ghost"
        >
          <MessageSquare className="size-5" />
          <span>{experience.commentsCount}</span>
        </Link>
      </Button>
    </div>
  );
}

type ExperienceCardAvatarProps = Pick<ExperienceCardProps, "experience">;

function ExperienceCardAvatar({ experience }: ExperienceCardAvatarProps) {
  return (
    <Link to="/users/$userId" params={{ userId: experience.user.id }}>
      <UserAvatar user={experience.user} showName={false} />
    </Link>
  );
}

type ExperienceCardActionButtonsProps = Pick<ExperienceCardProps, "experience">;

function ExperienceCardActionButtons({
  experience,
}: ExperienceCardActionButtonsProps) {
  const { currentUser } = useCurrentUser();

  const isPostOwner = currentUser?.id === experience.userId;

  if (isPostOwner) {
    return <ExperienceCardOwnerButtons experience={experience} />;
  }

  return null;
}

type ExperienceCardOwnerButtonsProps = Pick<ExperienceCardProps, "experience">;

function ExperienceCardOwnerButtons({
  experience,
}: ExperienceCardOwnerButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button variant="link" asChild>
        <Link
          to="/experiences/$experienceId/edit"
          params={{ experienceId: experience.id }}
          variant="ghost"
        >
          Edit
        </Link>
      </Button>
    </div>
  );
}

export default ExperienceCard;
