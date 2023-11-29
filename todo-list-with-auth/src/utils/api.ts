"use server";

import { db } from "~/server/db";

export async function getFormInfo() {
  const categories = await getCategories();
  const priorities = await getPriorites();
  return {
    categories,
    priorities,
  };
}

export async function getCategories() {
  return await db.category.findMany();
}

export async function getPriorites() {
  return await db.priority.findMany();
}
