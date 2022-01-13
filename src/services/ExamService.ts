import Database from '../util/database';
import { ExamStatus, IExamDTO, IUpdateBatchExamDTO } from '../dto/exam.dto';

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
    exam: IUpdateBatchExamDTO[] | Partial<IExamDTO>,
    id?: IExamDTO['id']
  ) {
    const trx = await this.database.transaction();

    const collection = (
      id ? [{ filters: { id }, values: exam }] : exam
    ) as IUpdateBatchExamDTO[];

    try {
      const querys = collection.map(({ filters, values }) => {
        const where = {
          id: filters.id,
          status: filters.status,
          deleted_at: filters.deleted_at,
        };

        const whereNoUndefined = JSON.parse(JSON.stringify(where));

        const update = { name: values.name, deleted_at: values.deleted_at };

        const updateNoUndefined = JSON.parse(JSON.stringify(update));

        return this.database.db
          .where(whereNoUndefined)
          .update(updateNoUndefined)
          .transacting(trx);
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
    const shareFilters = { status: ExamStatus.ACTIVE, deleted_at: null };
    const values = { deleted_at: new Date() };

    const collection = id
      ? [
          {
            filters: {
              id,
              ...shareFilters,
            },
            values,
          },
        ]
      : listIds?.map((listId) => ({
          filters: {
            id: listId,
            ...shareFilters,
          },
          values,
        }));

    return this.update(collection!);
  }
}
