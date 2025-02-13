// app/components/LogoutButton.tsx
"use client";

import { useAuthStore } from '@/store/authStore';

export default function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <button onClick={logout}>
      Logout
    </button>
  );
}
