import { getRepository, Repository } from "typeorm";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const userWithGames = await this.repository.findOne(user_id, {
      relations: ["games"],
    });
    if (!userWithGames) throw new Error("user not exists");

    return userWithGames;
    // Complete usando ORM
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(
      "SELECT * FROM users ORDER BY users.first_name asc"
    ); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(
      ` SELECT 
          * 
        FROM 
          users u
        WHERE 
          u.first_name ilike '%${first_name}%' 
        AND 
          u.last_name ilike '%${last_name}%'`
    ); // Complete usando raw query
  }
}
