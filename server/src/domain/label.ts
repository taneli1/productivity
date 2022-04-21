import { UserInput } from "./types/userInput";

export interface ILabel {
  _id: string;
  accountId: string;
  name: string;
  hex: string;
}

export interface ILabelService {
  getLabel: (id: string) => Promise<ILabel>;

  createLabel: (params: INewLabel) => Promise<ILabel>;
  deleteLabel: (id: string) => Promise<ILabel>;
}

export interface INewLabel extends UserInput {
  name: string;
  hex: string;
}
