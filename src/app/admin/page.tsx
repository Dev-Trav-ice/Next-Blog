import Categories from "@/components/admin/Categories";
import CreateCategories from "@/components/admin/CreateCategories";

export default function page() {
  return (
    <main>
      <CreateCategories />
      <Categories />
    </main>
  );
}
