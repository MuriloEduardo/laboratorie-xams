import Database from '../util/database';
import { IExamDTO } from '../dto/exam.dto';

export default class ExamService {
  constructor(protected database = new Database()) {
    this.database.tableName = 'exams';
  }

  find(filters?: Partial<IExamDTO>) {
    return this.database.db.select().where({
      ...filters,
      deleted_at: null,
    });
  }

  create(laboratoryDTO: IExamDTO) {
    return this.database.db.insert(laboratoryDTO);
  }

  update(id: string, { name, address }: Partial<IExamDTO>) {
    return this.database.db.where({ id }).update({ name, address });
  }

  delete(id: string) {
    return this.database.db.where({ id }).update({ deleted_at: new Date() });
  }
}
