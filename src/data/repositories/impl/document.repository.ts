import { DocumentFile } from "../../entities/document";
import { IDocument } from "../../../domain/models/document";
import { NotFoundException } from "../../../shared/exceptions/not-found.exception";
import { IDocumentRepository } from "../contracts/repository.base";

export class DocumentRepository implements IDocumentRepository {
  /**
   *
   */
  constructor() {}
  findByName(name: string): Promise<DocumentFile | null> {
    throw new Error("Method not implemented.");
  }

  /**
   * Receives a Document as parameter
   * @document
   * returns void
   */
  async create(document: IDocument): Promise<DocumentFile> {
    try {
      return await DocumentFile.create<DocumentFile>({ ...document });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @id
   * returns Document
   */
  async findById(id: string): Promise<DocumentFile | null> {
    try {
      const documentItem = await DocumentFile.findByPk(id);

      if (!documentItem) {
        throw new NotFoundException("Document", id);
      }
      return documentItem;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a String as parameter
   * @title
   * returns Category
   */
  async findByTitle(title: string): Promise<DocumentFile | null> {
    try {
      const document = await DocumentFile.findOne({ where: { title } });
      return document;
    } catch (error) {
      throw error;
    }
  }

  /*
   * Returns an array of Document
   */
  async getAll(): Promise<DocumentFile[]> {
    try {
      const categories = await DocumentFile.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a Document as parameter
   * @document
   * returns void
   */
  async update(document: IDocument): Promise<DocumentFile> {
    const { id } = document;
    try {
      const documentItem: any = await DocumentFile.findByPk(id);

      console.log(document);
      if (!documentItem) {
        throw new NotFoundException("Document", id.toString());
      }

      return await documentItem.update({ ...document });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Receives a string as parameter
   * @id
   * returns void
   */
  async delete(id: string): Promise<void> {
    try {
      const documentItem = await DocumentFile.findByPk(id);

      if (!documentItem) {
        throw new NotFoundException("Document", id);
      }

      await documentItem.destroy({
        force: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
