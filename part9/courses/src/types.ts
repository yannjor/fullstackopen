interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  kind: "basic";
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
  kind: "description";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartRequirements extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartDescription
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirements;
