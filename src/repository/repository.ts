import { Injectable, Scope } from '@nestjs/common';
import neo4j, {
  Driver,
  Session,
  Result,
  QueryResult,
  Record,
} from 'neo4j-driver';
import { Job } from 'src/domain/job/job';

@Injectable({ scope: Scope.REQUEST })
export class Neo4jRepository {
  private readonly driver: Driver;
  private readonly session: Session;
  constructor() {
    this.driver = neo4j.driver(
      'neo4j+s://localhost:7687',

      //neo4j.auth.basic('username', 'password'),
    );
    this.session = this.driver.session();
  }

  public async create(job: Job): Promise<Result> {
    const result: QueryResult = await this.session.run(
      `CREATE (j:Job) SET t = $properties RETURN t`,
      { properties: job },
    );
    return result;
  }

  public async read(jobId: number): Promise<Job | null> {
    const result: QueryResult<Job> = await this.session.run(
      `MATCH (j:Job) WHERE j.jobId = $jobId RETURN t LIMIT 1`,
      { jobId },
    );
    if (result.records.length === 0) {
      return null;
    }
    const node: Record = result.records[0];
    return node.get('job');
  }

  public async updateJob(jobId: number, updatedJob: Job): Promise<Result> {
    const result: QueryResult = await this.session.run(
      `MATCH (j:Job) WHERE j.jobId = $jobId SET t = $properties RETURN t`,
      { jobId, properties: updatedJob },
    );
    return result;
  }

  public async deleteJob(jobId: number): Promise<Result> {
    const result: QueryResult = await this.session.run(
      `MATCH (j:Job) WHERE j.jobId = $jobId DELETE t`,
      { jobId },
    );
    return result;
  }
}
