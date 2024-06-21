import { MuseumModel } from "@/modules/museum/domain/museum.model";

export interface IMuseumRepository {
  getMuseums(
    query?: string,
    categoryId?: string
  ): Promise<MuseumModel.Museum[]>;

  getCategories(): Promise<MuseumModel.Category[]>;
}
