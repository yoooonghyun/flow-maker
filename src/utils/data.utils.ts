import { v4 } from 'uuid';

export class DataUtils {
  public static generateUuid(): string {
    return v4();
  }
}
