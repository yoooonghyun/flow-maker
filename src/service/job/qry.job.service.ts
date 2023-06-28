import { Injectable, Scope } from '@nestjs/common';
import { Job } from 'src/domain/job/job';
import { Repository } from 'src/repository/repository';
import { QryJobListObject, QryJobObject } from 'src/service/job/job.object';

/**
 * Service class for querying job objects.
 * @class
 */
@Injectable({ scope: Scope.REQUEST })
export class QryJobService {
  /**
   * Creates an instance of QryJobService.
   * @constructor
   * @param {Repository} repo - The repository used for data access.
   */
  constructor(private readonly repo: Repository) {}

  /**
   * Finds a single job by its unique ID.
   * @public
   * @async
   * @method
   * @param {string} jobId - The unique ID of the job to find.
   * @returns {Promise<QryJobObject>} - A promise that resolves to the queried job object.
   */
  public async read(jobId: string): Promise<QryJobObject> {
    return await this.repo.read(Job, jobId);
  }

  /**
   * Finds multiple jobs.
   * @public
   * @async
   * @method
   * @returns {Promise<QryJobListObject>} - A promise that resolves to the list of queried job objects.
   */
  public async readMany(): Promise<QryJobListObject> {
    return await this.repo.readMany(Job);
  }
}
