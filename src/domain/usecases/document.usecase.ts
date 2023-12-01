import { DocumentFile } from "../../data/entities/document";
import { IDocumentRepository } from "../../data/repositories/contracts/repository.base";
import { IDocument } from "../models/document";
import slugify from "slugify";
export class DocumentUseCase {
  /**
   *
   */
  constructor(private readonly documentRepository: IDocumentRepository) {}

  async createDocument(document: IDocument): Promise<DocumentFile> {
    const existingDocument = await this.documentRepository.findByTitle(
      document.title
    );

    if (existingDocument) {
      throw new Error("Document already exists");
    }

    // const _document = new Document({document});
    //because it's already done in the Repository
    return this.documentRepository.create(document);
  }

  async getAll(): Promise<DocumentFile[]> {
    return this.documentRepository.getAll();
  }

  async getDocumentById(id: string): Promise<DocumentFile | null> {
    return this.documentRepository.findById(id);
  }

  async updateDocument(document: IDocument): Promise<DocumentFile> {
    const obj: IDocument = {
      ...document,
      slug: slugify(document.title, { lower: true, replacement: "-" }),
    };
    return this.documentRepository.update(obj);
  }

  async deleteDocument(id: string): Promise<void> {
    return this.documentRepository.delete(id);
  }
}
