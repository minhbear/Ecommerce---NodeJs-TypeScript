import { LeanElectronicDocument } from "@/interfaces/electronic.interface";
import electronicModel from "@/models/products/electronic.model";

export default class ElectronicRepo{
    static async createElectronic(createElectronic: any): Promise<LeanElectronicDocument> {
        return await electronicModel.create({ ...createElectronic });
    }
}