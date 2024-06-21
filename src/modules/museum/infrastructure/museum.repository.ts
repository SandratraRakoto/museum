import { IMuseumRepository } from "@/modules/museum/domain/museum.repository.interface";
import { MuseumModel } from "@/modules/museum/domain/museum.model";

export class MuseumRepository implements IMuseumRepository {
  async getMuseums(
    query?: string,
    categoryId?: string
  ): Promise<MuseumModel.Museum[]> {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error("API URL is not defined");
    }

    try {
      const url = new URL(`${apiUrl}/museum`);
      if (query) {
        url.searchParams.append("q", query);
      }
      if (categoryId) {
        url.searchParams.append("category", categoryId);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data: MuseumModel.Museum[] = await response.json();

      return data;
    } catch (error) {
      console.error("Failed to fetch museums:", error);
      throw error;
    }
  }

  async getCategories(): Promise<MuseumModel.Category[]> {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error("API URL is not defined");
    }

    try {
      const url = new URL(`${apiUrl}/category`);
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data: MuseumModel.Category[] = await response.json();

      return data;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error;
    }
  }
}
