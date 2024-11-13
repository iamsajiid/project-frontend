import { CommentModel } from "./Comment.model";

export interface IncidentModel {
    incId: number;
    incSubject: string;
    incDescription: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    comments?: Array<CommentModel>;
  }
  