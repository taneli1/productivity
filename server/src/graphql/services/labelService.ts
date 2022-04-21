import { Service } from "typedi";
import { ILabel, ILabelService, INewLabel } from "../../domain/label";
import Label from "../../database/models/labelModel";

@Service()
export class LabelService implements ILabelService {
  async getLabel(id: string) {
    const label = await Label.findById(id);
    if (!label) {
      throw new Error("Label not found");
    }

    return label;
  }

  async getUserLabels(userId: string) {
    return await Label.find({ userId: userId });
  }

  async createLabel(userId: string, params: INewLabel): Promise<ILabel> {
    return await Label.create({
      name: params.name,
      hex: params.hex,
      userId: userId,
    });
  }

  async deleteLabel(id: string): Promise<ILabel> {
    const res = await Label.findByIdAndDelete(id);
    if (!res) {
      throw new Error("Label not found");
    }
    return res;
  }
}
