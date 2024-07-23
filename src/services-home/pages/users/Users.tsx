import { useQuery } from "@tanstack/react-query";
import { useLoginStore } from "../../../auth/store/login.store";
import { TitlePage } from "../../components/TitlePage";
import { UserService } from "../../services/user.service";
import { User } from "../../../auth/interfaces";
import { useState } from "react";
import Modal from "react-modal";
import { CreateUser } from "./CreateUser";
import { NavLink } from "react-router-dom";

export const Users = () => {
  const token = useLoginStore((set) => set.token);

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => UserService.getAllUsers(token),
    enabled: !!token,
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (isLoading) return "Cargando data...";

  if (data)
    return (
      <div>
        <TitlePage title="Users" />

        <div className="mt-9">
          <button
            className="bg-green-600 text-white px-3 py-1 rounded mb-5"
            onClick={openModal}
          >
            Crear
          </button>
          <NavLink
            to="/home"
            className="bg-red-600 text-white px-3 py-1 rounded ml-5 mb-5"
          >
            Volver
          </NavLink>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.users.map((user: User) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.dni}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="flex justify-center mt-28"
        >
          <CreateUser  />
        </Modal>
      </div>
    );
};
