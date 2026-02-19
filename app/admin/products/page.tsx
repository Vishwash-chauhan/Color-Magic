export const dynamic = "force-dynamic";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import DeleteProductButton from "@/src/components/DeleteProductButton";

export default async function AdminProductsPage() {
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      orderBy: [ { sortOrder: 'asc' }, { createdAt: 'desc' } ],
    });
  } catch (err) {
    // fail gracefully during build/runtime if DB is unreachable
    console.error("Prisma query failed in /admin/products:", err);
    products = [];
  }

  async function deleteProduct(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");
  }

  async function setFeatured(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;
    const setStr = formData.get("set") as string;
    const set = setStr === "true";

    if (set) {
      const count = await prisma.product.count({ where: { isFeatured: true } });
      if (count >= 12) {
        throw new Error("Maximum of 12 featured products allowed. Unfeature another product first.");
      }
    }

    await prisma.product.update({ where: { id }, data: { isFeatured: set } });
    revalidatePath("/admin/products");
  }

  async function moveProduct(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;
    const dir = formData.get("dir") as string; // 'up' | 'down'

    const current = await prisma.product.findUnique({ where: { id } });
    if (!current) return;

    const currentOrder = current.sortOrder ?? 0;

    let other: any = null;
    if (dir === "up") {
      other = await prisma.product.findFirst({ where: { sortOrder: { lt: currentOrder } }, orderBy: [{ sortOrder: 'desc' }, { createdAt: 'desc' }], take: 1 });
    } else {
      other = await prisma.product.findFirst({ where: { sortOrder: { gt: currentOrder } }, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }], take: 1 });
    }

    if (!other) return; // nothing to swap with

    // swap sortOrder values
    await prisma.product.update({ where: { id }, data: { sortOrder: other.sortOrder } });
    await prisma.product.update({ where: { id: other.id }, data: { sortOrder: currentOrder } });

    revalidatePath("/admin/products");
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Product Management</h1>
          <p className="text-slate-500 mt-2">Manage your printing products</p>
        </div>
        <Link
          href="/admin/add-product"
          className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition shadow-lg"
        >
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl">
          <p className="text-slate-400 text-lg mb-4">No products yet</p>
          <Link
            href="/admin/add-product"
            className="text-blue-600 hover:underline font-medium"
          >
            Add your first product
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 font-semibold text-sm">Image</th>
                <th className="text-left p-4 font-semibold text-sm">Name</th>
                <th className="text-left p-4 font-semibold text-sm">Images</th>
                <th className="text-left p-4 font-semibold text-sm">Featured</th>
                <th className="text-right p-4 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4">
                    {product.imageUrls.length > 0 && (
                      <img
                        src={product.imageUrls[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                      />
                    )}
                  </td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 text-slate-500 text-sm">
                    {product.imageUrls.length} image{product.imageUrls.length !== 1 ? "s" : ""}
                  </td>
                  <td className="p-4 text-center">
                    <form action={setFeatured} className="inline">
                      <input type="hidden" name="id" value={product.id} />
                      <input type="hidden" name="set" value={product.isFeatured ? "false" : "true"} />
                      <button
                        type="submit"
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition ${product.isFeatured ? 'bg-yellow-400 text-slate-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                        title={product.isFeatured ? 'Unfeature' : 'Set as featured'}
                      >
                        {product.isFeatured ? '★ Featured' : 'Set featured'}
                      </button>
                    </form>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-end items-center">
                      <form action={moveProduct} className="inline">
                        <input type="hidden" name="id" value={product.id} />
                        <input type="hidden" name="dir" value="up" />
                        <button type="submit" title="Move up" className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200">▲</button>
                      </form>

                      <form action={moveProduct} className="inline">
                        <input type="hidden" name="id" value={product.id} />
                        <input type="hidden" name="dir" value="down" />
                        <button type="submit" title="Move down" className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200">▼</button>
                      </form>

                      <Link
                        href={`/admin/edit-product/${product.id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition"
                      >
                        Edit
                      </Link>
                      <DeleteProductButton
                        productId={product.id}
                        productName={product.name}
                        onDelete={deleteProduct}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
