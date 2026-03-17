import Link from "next/link";
import type { LessonModule } from "@/lib/learning-data";
import { DIFFICULTY_LABELS } from "@/lib/learning-data";

type CourseCardProps = {
  module: LessonModule;
};

export default function CourseCard({ module }: CourseCardProps) {
  return (
    <Link
      href={`/learn/${module.slug}`}
      className="course-card"
      aria-label={`Go to ${module.title} module`}
    >
      <span className="course-card-title">{module.title}</span>
      <span className="course-card-summary">{module.summary}</span>
      <span className={`course-card-difficulty course-card-difficulty--${module.difficulty}`}>
        {DIFFICULTY_LABELS[module.difficulty]}
      </span>
    </Link>
  );
}
