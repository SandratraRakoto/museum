import { MuseumModel } from "@/modules/museum/domain/museum.model";

export interface IMuseumRepository {
  getMuseums(): Promise<MuseumModel.Museum[]>;
}
