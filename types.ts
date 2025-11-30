export enum SkinType {
  DRY = 'Seca',
  OILY = 'Oleosa',
  COMBINATION = 'Mista',
  SENSITIVE = 'Sensível',
  NORMAL = 'Normal'
}

export enum Gender {
  MALE = 'Masculino',
  FEMALE = 'Feminino',
  OTHER = 'Outro'
}

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  skinType: SkinType;
  concerns: string[];
  goals: string[]; // e.g., "Definir mandíbula", "Ganhar massa"
  preferences: string; // Brands, organic, etc.
}

export interface ProductRecommendation {
  name: string;
  brand: string;
  type: string; // Cleanser, Serum, etc.
  reason: string;
  keyIngredients: string[];
}

export interface RoutineStep {
  stepName: string;
  description: string;
  products: string[]; // References product names
}

export interface FacialExercise {
  name: string;
  description: string;
  frequency: string;
}

export interface PhysiqueTip {
  category: 'Treino' | 'Nutrição' | 'Lifestyle';
  advice: string;
}

export interface M7Plan {
  skincareRoutine: {
    morning: RoutineStep[];
    evening: RoutineStep[];
  };
  recommendedProducts: ProductRecommendation[];
  facialArchitecture: {
    analysis: string;
    exercises: FacialExercise[];
  };
  physiqueStrategy: {
    analysis: string;
    tips: PhysiqueTip[];
  };
}