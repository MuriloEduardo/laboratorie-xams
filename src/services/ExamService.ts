import Database from '../util/database';
import { IExamDTO, IUpdateCollectionExamDTO } from '../dto/exam.dto';

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

  async update(
    exam: IUpdateCollectionExamDTO[] | Partial<IExamDTO>,
    id?: IExamDTO['id']
  ) {
    const trx = await this.database.transaction();

    const collection = (
      id ? [{ id, values: exam }] : exam
    ) as IUpdateCollectionExamDTO[];

    try {
      const querys = collection.map(({ id, values: { name } }) =>
        this.database.db.where({ id }).update({ name }).transacting(trx)
      );

      const results = await Promise.all(querys);

      const hasNotFounds = results?.filter((up) => up === 0);

      if (hasNotFounds.length) {
        await trx.rollback();

        return;
      }

      await trx.commit();

      return results;
    } catch (error) {
      await trx.rollback();
    }
  }

  delete(id: IExamDTO['id']) {
    return this.database.db.where({ id }).update({ deleted_at: new Date() });
  }
}
