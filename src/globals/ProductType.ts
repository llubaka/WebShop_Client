// Type of products.json
export type ProductType = {
  id: string;
  info: string;
  price: string;
  imageUrl: string;
  discount: number;
  tags: string[];
  additionalImagesUrls: string[];
  description: Record<any, any>;
};
