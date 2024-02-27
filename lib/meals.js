import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  // simulate a delay to make use of loaders later on
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * from meals WHERE slug = ?").get(slug);
}
