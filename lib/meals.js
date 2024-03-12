import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  // simulate a delay to make use of loaders later on
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * from meals WHERE slug = ?").get(slug);
}

export const saveMeal = async (meal) => {
  const slug = slugify(meal.title, { lower: true });
  const instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  const image = `/images/${fileName}`;

  const newMeal = { ...meal, image, instructions, slug };
  console.log({ newMeal });

  db.prepare(
    `
    INSERT INTO meals(
      title,
      summary,
      instructions,
      creator,
      creator_email,
      image,
      slug
    )
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(newMeal);
};
