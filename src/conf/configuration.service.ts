import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { School } from 'src/modules/school/entities/school.entity';

@Injectable()
export class ConfigMainDBService {
  constructor(private configService: ConfigService) {}

  get type(): any {
    return this.configService.get<string>('db.main.type');
  }

  get masterUrl(): string {
    return this.configService.get<string>('db.main.master.url');
  }

  get masterPort(): number {
    return this.configService.get<number>('db.main.master.port');
  }

  get masterDatabase(): string {
    return this.configService.get<string>('db.main.master.database');
  }

  get masterUsername(): string {
    return this.configService.get<string>('db.main.master.username');
  }

  get masterPassword(): string {
    return this.configService.get<string>('db.main.master.password');
  }

  get slaveUrl(): string {
    return this.configService.get<string>('db.main.slaves[0].url');
  }

  get slavePort(): number {
    return this.configService.get<number>('db.main.slaves[0].port');
  }

  get slaveDatabase(): string {
    return this.configService.get<string>('db.main.slaves[0].database');
  }

  get slaveUsername(): string {
    return this.configService.get<string>('db.main.slaves[0].username');
  }

  get slavePassword(): string {
    return this.configService.get<string>('db.main.slaves[0].password');
  }

  getMainDBConfig(): TypeOrmModuleOptions {
    console.log('HellO');
    return {
      type: this.type,
      replication: {
        master: {
          host: this.masterUrl,
          port: this.masterPort,
          username: this.masterUsername,
          password: this.masterPassword,
          database: this.masterDatabase,
        },
        slaves: [
          {
            host: this.slaveUrl,
            port: this.slavePort,
            username: this.slaveUsername,
            password: this.slavePassword,
            database: this.slaveDatabase,
          },
        ],
      },
      entities: [School],
      /**
       * Remove tables when it starts
       */
      synchronize: true,
    };
  }
}
