// components/UsersTable.tsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import api from "@/services/api";

import type { User } from "@/types/User";

type UsersTableProps = {
  itemsPerPage?: number;
};

const UsersTable = ({ itemsPerPage = 8 }: UsersTableProps) => {
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    const getUsers = async () => {
      const res = await api.get("/users/", {withCredentials: true})
      if (res.status == 200) {
        setUsers(res.data)
        console.log(res.data)
      }
    }

    getUsers()
  }, [])

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "ellipsis")[] = [1];
    if (currentPage > 3) pages.push("ellipsis");

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);

    return pages;
  };

  return (
    <Card className="p-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Usuários</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                Nenhum usuário encontrado.
              </TableCell>
            </TableRow>
          ) : (
            paginatedUsers.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium text-gray-400">
                  {u.id}
                </TableCell>
                <TableCell className="font-medium">{u.username}</TableCell>
                <TableCell className="text-gray-500">{u.full_name}</TableCell>
                <TableCell>
                  {u.active ? (
                    <div className="bg-green-400 p-2 w-3 h-3 rounded-full"/>
                  ) : (
                    <div className="bg-red-500 p-2 w-3 h-3 rounded-full"/>
                  )}
                </TableCell>
                <TableCell className="text-gray-500 flex items-center gap-4">
                  <button>Deletar</button>
                  <button>Desativar</button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500">
        <span>
          Mostrando{" "}
          {users.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
          {Math.min(currentPage * itemsPerPage, users.length)} de {users.length}{" "}
          usuários
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>

          {getPageNumbers().map((page, idx) =>
            page === "ellipsis" ? (
              <span key={`ellipsis-${idx}`} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                  page === currentPage
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default UsersTable;