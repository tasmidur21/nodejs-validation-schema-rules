import { Database } from '../contacts/Database'
import { Client as PostgresClient } from 'pg'

export class PostgresDatabase implements Database {
  private client: PostgresClient

  constructor(config: any) {
    this.client = new PostgresClient(config)
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect()
    } catch (error: any) {
      throw error
    }
  }

  async query(sql: string): Promise<any> {
    try {
      return await this.client.query(sql)
    } catch (error: any) {
      throw error
    }
  }

  async end(): Promise<void> {
    try {
      await this.client.end()
    } catch (error: any) {
      throw error
    }
  }
}
