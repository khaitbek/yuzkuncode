import { type Todo } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type State = {
  draggedTask: Todo["id"] | null;
  draggedStatus: string | null;
};

export type Actions = {
  dragTask: (id: Todo["id"] | null, status: string) => void;
};

export const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      draggedTask: null,
      dragTask: (id, status) => set({ draggedTask: id, draggedStatus: status }),
      draggedStatus: null,
    }),
    {
      name: "task-storage",
      skipHydration: true,
    },
  ),
);
