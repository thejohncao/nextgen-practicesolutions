
import { useAuth } from "../../../hooks/useAuth"; // Path relative to /g/app/hooks

export function useRole() {
  const { profile } = useAuth();
  return profile?.role;
}
