import { useState, useEffect } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { Trash } from "lucide-react"

import api from "@/services/api"
import type { Product } from "@/types/Product"
import { DataTable } from "@/components/DataTable"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"


function DeleteButton({ productId }: { productId: number }) {
  const [open, setOpen] = useState(false)

  async function handleConfirm() {
    const res = await api.delete(`/products/${productId}/`, {withCredentials: true})
    if (res.status === 200) {
      toast.success("Produto deletado com sucesso!")
      window.location.reload()
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className="cursor-pointer hover:scale-102 duration-300">
          <Trash className="w-4 h-4 mr-1" />
          Deletar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar produto</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar esse produto? Essa ação não pode ser
            desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="cursor-pointer">
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm} className="cursor-pointer">
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => {
      const price: number = row.getValue("price")
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price)
      return <span>{formatted}</span>
    },
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => <DeleteButton productId={row.original.id} />,
  },
]


export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get<Product[]>("/products/")
        setProducts(response.data)
      } catch (err) {
        setError("Erro ao carregar produtos. Tente novamente.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Produtos</h1>

      {loading && <p className="text-muted-foreground">Carregando produtos...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <DataTable columns={columns} data={products} />}
    </div>
  )
}
