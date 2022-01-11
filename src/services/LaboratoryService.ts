interface ILaboratoryBody {
  name: string;
  address: string;
  status: string;
}

export default class LaboratoryService {
  find() {
    return [{ name: '', address: '', status: '' }];
  }

  create(body: ILaboratoryBody) {
    console.log('Email enviado', body);
  }
}
