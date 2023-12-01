import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import { IDocumentTag } from "../../domain/models/document-tag";
import { Tag } from "./tag";
import { DocumentFile } from "./document";
@Table({
  timestamps: true,
  paranoid: true,
  tableName: "documentTag",
  modelName: "DocumentTag",
})
export class DocumentTag extends Model<IDocumentTag> {
  @ForeignKey(() => DocumentFile) // foreign key
  @Column
  documentId!: string;

  @ForeignKey(() => Tag) // foreign key
  @Column
  tagId!: string;
}
