import { CrudService } from "@/services/base/CrudService";
import { User, type UserRow } from "@/domain/User";

export type UserInsertDto = Omit<UserRow, "id" | "created_at">;
export type UserUpdateDto = Partial<UserInsertDto>;

export const userService = new CrudService<User, UserRow, UserInsertDto, UserUpdateDto>(
  "users",
  User.fromRow
);
