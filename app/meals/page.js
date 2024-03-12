import { getMeals } from "@/lib/meals";
import MealsGrid from "../components/meals/meals-grid";
import classes from "./page.module.css";
import { Suspense } from "react";
import Link from "next/link";

const Meals = async () => {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
};
const MealsPage = async () => {
  return (
    <>
      <header className={classes.header}>
        <h1>Delicious meals, created </h1>
        <span className={classes.highlight}>by you</span>
        <p>Choose your favourite recipe and cook it yourself.</p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favourite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
