import { useAsync } from "./useAsync";
import { User } from "@/domain/User";
import { userService } from "@/services/user/UserService";

export function useUser(userId: string | null | undefined) {
  const { data: user, loading, error } = useAsync(
    async () => {
      if (!userId) {
        return null;
      }
      return await userService.getById(userId);
    },
    [userId]
  );

  return { user: user || null, loading, error };
}
