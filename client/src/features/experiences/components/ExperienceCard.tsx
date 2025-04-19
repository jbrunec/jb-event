import { LinkIcon, MessageSquare } from "lucide-react";

import Card from "@/features/shared/components/ui/Card";

import { ExperienceForList } from "../types";

type ExperienceCardProps = {
  experience: ExperienceForList;
};

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <ExperienceCardMedia experience={experience} />
      <div className="w-full space-y-4 p-4">
        <ExperienceCardHeader experience={experience} />
        <ExperienceCardContent experience={experience} />
        <ExperienceCardMeta experience={experience} />
        <ExperienceCardMetricButtons experience={experience} />
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
      <div>{experience.user.name}</div>
      <h2 className="text-secondary-500 dark:text-primary-500 text-xl font-bold">
        {experience.title}
      </h2>
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
      <MessageSquare className="size-5" />
      <span>{experience.commentsCount}</span>
    </div>
  );
}

export default ExperienceCard;
