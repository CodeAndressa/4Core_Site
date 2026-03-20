export type CategorySlug = 'controle-de-jornada' | 'controle-de-acesso' | 'seguranca-operacional';

export interface ProductSpecs {
  tipo: string;
  tecnologia: string;
  conectividade: string;
  conformidade: string;
}

export interface Product {
  slug: string;
  category: CategorySlug;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  problem: string;
  solution: string;
  benefits: string[];
  specs: ProductSpecs;
  applications: string[];
  ctaText?: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}
