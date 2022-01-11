import Laboratory from '../models/Laboratory';

interface ILaboratoryBody {
  name: string;
  address: string;
  status: string;
}

export default class LaboratoryService {
  constructor(protected laboratory = new Laboratory()) {}

  find() {
    return this.laboratory.find();
  }

  create(body: ILaboratoryBody) {
    console.log('Email enviado', body);
  }
}
