export type Skill = {
  id: string;
  title: string;
  image: string[];
  description: string;
  homepageLink: string;
  type: string;
};

export type SkillType = "language" | "library" | "framework" | "hobby";
