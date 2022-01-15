import Database from '../util/database';
import { ExamStatus, IExamDTO, IUpdateBatchExamDTO } from '../dto/exam.dto';

export default class ExamService {
  constructor(protected database = new Database()) {
    this.database.tableName = 'exams';
  }

  find(filters?: Partial<IExamDTO>) {
    return this.database.db.select('id', 'name', 'type', 'status').where({
      ...filters,
      deleted_at: null,
    });
  }

  create(laboratoryDTO: IExamDTO) {
    return this.database.db.insert(laboratoryDTO);
  }

  async update(
    exam: IUpdateBatchExamDTO[] | Partial<IExamDTO>,
    id?: IExamDTO['id']
  ) {
    const trx = await this.database.transaction();

    const collection = (
      id ? [{ filters: { id }, values: exam }] : exam
    ) as IUpdateBatchExamDTO[];

    try {
      const querys = collection.map(({ filters, values }) => {
        const update = { name: values.name, deleted_at: values.deleted_at };

        let where: Partial<IExamDTO> = {
          id: filters.id,
          deleted_at: null,
        };

        if (filters.status) {
          where = { ...where, status: filters.status };
        }

        return this.database.db.where(where).update(update).transacting(trx);
      });

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

  delete(listIds?: IExamDTO['id'][], id?: IExamDTO['id']) {
    const status = ExamStatus.ACTIVE;
    const values = { deleted_at: new Date() };

    const collection = id
      ? [
          {
            filters: {
              id,
              status,
            },
            values,
          },
        ]
      : listIds?.map((listId) => ({
          filters: {
            id: listId,
            status,
          },
          values,
        }));

    return this.update(collection!);
  }
}
