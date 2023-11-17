import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger();

  getHello(): string {
    return 'Hello World!';
  }

  blocking() {
    // Synchronous, blocking operation
    const now = new Date().getTime();
    while (new Date().getTime() < now + 10000) {}
    return {};
  }

  async nonBlocking() {
    // Asynchronous, non-blocking operation
    return new Promise(async (resolve) => {
      setTimeout(() => {
        resolve({});
      }, 10000);
    });
  }

  private async sleep() {
    return new Promise((resolve) => {
      this.logger.log('Start Sleep');
      setTimeout(() => {
        this.logger.log('Sleep Complete');
        resolve({});
      }, 1000);
    });
  }

  async promises() {
    const results = [];
    for (let i = 0; i < 10; i++) {
      results.push(await this.sleep());
    }
    return results;
  }

  // Concurrency or Parallelism
  async promisesParallel() {
    const promises = [];
    for (let i = 0; i < 10; i++) {
      promises.push(this.sleep());
    }
    return Promise.all(promises);
  }
}
