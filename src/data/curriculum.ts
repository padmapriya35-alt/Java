import { Stage, Lesson } from '../types/curriculum';
import { stage1 } from './stages/stage1_environment';
import { stage2 } from './stages/stage2_fundamentals';
import { stage3 } from './stages/stage3_control_flow';
import { stage4 } from './stages/stage4_methods';
import { stage5 } from './stages/stage5_oop';
import { stage6 } from './stages/stage6_exceptions';
import { stage7 } from './stages/stage7_collections';
import { stage8 } from './stages/stage8_modern_java';
import { stage9 } from './stages/stage9_files_and_data';
import { stage10 } from './stages/stage10_concurrency';
import { stage11 } from './stages/stage11_jvm';
import { stage12 } from './stages/stage12_backend';
import { stage13 } from './stages/stage13_security';

export const ALL_STAGES: Stage[] = [
  stage1,
  stage2,
  stage3,
  stage4,
  stage5,
  stage6,
  stage7,
  stage8,
  stage9,
  stage10,
  stage11,
  stage12,
  stage13
];

export function getAllLessons(): Lesson[] {
  return ALL_STAGES.flatMap(stage => stage.lessons);
}

export function getLessonById(lessonId: string): Lesson | undefined {
  return getAllLessons().find(l => l.id === lessonId);
}

export function getStageByLessonId(lessonId: string): Stage | undefined {
  return ALL_STAGES.find(s => s.lessons.some(l => l.id === lessonId));
}

export function getAdjacentLessons(currentId: string): { prev: Lesson | null; next: Lesson | null } {
  const lessons = getAllLessons();
  const index = lessons.findIndex(l => l.id === currentId);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? lessons[index - 1] : null,
    next: index < lessons.length - 1 ? lessons[index + 1] : null
  };
}

export function searchCurriculum(query: string): { lesson: Lesson; matchedField: string }[] {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();
  const results: { lesson: Lesson; matchedField: string }[] = [];

  for (const lesson of getAllLessons()) {
    if (lesson.title.toLowerCase().includes(q)) {
      results.push({ lesson, matchedField: 'Title' });
    } else if (lesson.definition.toLowerCase().includes(q)) {
      results.push({ lesson, matchedField: 'Definition' });
    } else if (lesson.simpleExplanation.toLowerCase().includes(q)) {
      results.push({ lesson, matchedField: 'Explanation' });
    } else if (lesson.codeExample.toLowerCase().includes(q)) {
      results.push({ lesson, matchedField: 'Code' });
    }
  }

  return results;
}
