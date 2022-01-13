import {
  ILaboratoryDTO,
  IUpdateBatchLaboratoryDTO,
  LaboratoryStatus,
} from '../dto/laboratory.dto';
import Database from '../util/database';
import { IExamDTO } from '../dto/exam.dto';

export default class LaboratoryService {
  constructor(protected database = new Database()) {
    this.database.tableName = 'laboratories';
  }

  find(filters?: Partial<ILaboratoryDTO>) {
    return this.database.db.select().where({
      ...filters,
      deleted_at: null,
    });
  }

  create(laboratoryDTO: ILaboratoryDTO) {
    return this.database.db.insert(laboratoryDTO);
  }

  async update(
    laboratory: IUpdateBatchLaboratoryDTO[] | Partial<ILaboratoryDTO>,
    id?: ILaboratoryDTO['id']
  ) {
    const trx = await this.database.transaction();

    const collection = (
      id ? [{ filters: { id }, values: laboratory }] : laboratory
    ) as IUpdateBatchLaboratoryDTO[];

    try {
      const querys = collection.map(({ filters, values }) => {
        const update = {
          name: values.name,
          address: values.address,
          deleted_at: values.deleted_at,
        };
        const where = {
          id: filters.id,
          status: filters.status,
          deleted_at: null,
        };

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

  delete(listIds?: ILaboratoryDTO['id'][], id?: ILaboratoryDTO['id']) {
    const status = LaboratoryStatus.ACTIVE;
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

  searchByExam(exam: Partial<IExamDTO>) {
    return this.database.db
      .select(
        'laboratories.id',
        'laboratories.name',
        'laboratories.address',
        'laboratories.status'
      )
      .join('associations', 'laboratories.id', 'associations.laboratory_id')
      .join('exams', 'associations.exam_id', 'exams.id')
      .where('exams.name', exam.name);
  }
}
