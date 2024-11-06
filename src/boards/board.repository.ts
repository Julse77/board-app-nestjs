import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  // 추후 복잡한 쿼리 추가 예정
  async getAllBoards(user: User): Promise<Board[]> {
    return await this.createQueryBuilder('board')
      .where('board.userId = :userId', {
        userId: user.id,
      })
      .getMany();
  }
}
