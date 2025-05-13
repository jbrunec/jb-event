import { LinkIcon } from "lucide-react";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Button } from "@/features/shared/components/ui/Button";
import Card from "@/features/shared/components/ui/Card";
import Link from "@/features/shared/components/ui/Link";
import { router } from "@/router";

import { ExperienceForDetails } from "../types";
import { ExperienceDeleteDialog } from "./ExperienceDelete";

type ExperienceDetailsProps = {
  experience: ExperienceForDetails;
};

function ExperienceDetails({ experience }: ExperienceDetailsProps) {
  return (
    <Card className="p-0">
      <ExperienceDetailsMedia experience={experience} />
      <div className="space-y-4 p-4">
        <ExperienceDetailsHeader experience={experience} />
        <ExperienceDetailsContent experience={experience} />
        <ExperienceDetailsMeta experience={experience} />
        <ExperienceDetailsActionButtons experience={experience} />
      </div>
    </Card>
  );
}

type ExperienceDetailsMediaProps = Pick<ExperienceDetailsProps, "experience">;

function ExperienceDetailsMedia({ experience }: ExperienceDetailsMediaProps) {
  if (!experience.imageUrl) {
    return null;
  }
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg">
      <img
        src={experience.imageUrl}
        alt={experience.title}
        className="size-full object-cover"
      />
    </div>
  );
}

type ExperienceDetailsHeaderProps = Pick<ExperienceDetailsProps, "experience">;

function ExperienceDetailsHeader({ experience }: ExperienceDetailsHeaderProps) {
  return <h1 className="text-2xl font-bold">{experience.title}</h1>;
}

type ExperienceDetailsContentProps = Pick<ExperienceDetailsProps, "experience">;

function ExperienceDetailsContent({
  experience,
}: ExperienceDetailsContentProps) {
  return (
    <p className="text-lg text-neutral-600 dark:text-neutral-400">
      {experience.content}
    </p>
  );
}

type ExperienceDetailsMetaProps = Pick<ExperienceDetailsProps, "experience">;

function ExperienceDetailsMeta({ experience }: ExperienceDetailsMetaProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <time className="text-neutral-600 dark:text-neutral-400">
          {new Date(experience.scheduledAt).toLocaleString()}
        </time>
      </div>

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

type ExperienceDetailsActionButtonsProps = Pick<
  ExperienceDetailsProps,
  "experience"
>;

function ExperienceDetailsActionButtons({
  experience,
}: ExperienceDetailsActionButtonsProps) {
  const { currentUser } = useCurrentUser();

  const isPostOwner = currentUser?.id === experience.userId;

  if (isPostOwner) {
    return <ExperienceOwnerButtons experience={experience} />;
  }

  return null;
}

type ExperienceOwnerButtonsProps = Pick<ExperienceDetailsProps, "experience">;

function ExperienceOwnerButtons({ experience }: ExperienceOwnerButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button variant="outline" asChild>
        <Link
          to="/experiences/$experienceId/edit"
          params={{ experienceId: experience.id }}
          variant="ghost"
        >
          Edit
        </Link>
      </Button>
      <ExperienceDeleteDialog
        experience={experience}
        onSuccess={() =>
          router.navigate({
            to: "/",
          })
        }
      />
    </div>
  );
}

export default ExperienceDetails;
