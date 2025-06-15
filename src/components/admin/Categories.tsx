import { getCategories } from "@/actions/post.actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

export default async function Categories() {
  const categories = await getCategories();
  return (
    <div>
      <h1 className="text-2xl font-bold mt-12 mb-4 text-center">Categories</h1>
      <Table>
        <TableCaption>A list of all categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Button className="text-white text-sm bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-md mr-2">
                    Edit
                  </Button>
                  <Button>Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
