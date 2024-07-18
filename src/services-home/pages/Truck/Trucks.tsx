import { NavLink } from "react-router-dom";
import { TitlePage } from "../../components/TitlePage";
import { useLoginStore } from "../../../auth/store/login.store";
import { useQuery } from "@tanstack/react-query";
import { TruckService } from "../../services/truck.service";
import { useState } from "react";
import Modal from "react-modal";
import { CreateTruck } from "./CreateTruck";

export const Trucks = () => {
  const token = useLoginStore((set) => set.token);

  const { data, isLoading } = useQuery({
    queryKey: ["trucks"],
    queryFn: () => TruckService.getAllTrucks(token),
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
        <TitlePage title="Camiones" />

        <div className="mt-9">
          <button
            className="bg-green-600 text-white px-3 py-1 rounded mb-5"
            onClick={() => openModal()}
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
                    Marca
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Modelo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    placa
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cantidad de llantas
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.trucks.map((truck) => (
                  <tr key={truck.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {truck.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {truck.marca}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {truck.modelo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {truck.placa}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {truck.cantidad_llantas}
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
          <CreateTruck closeModal={closeModal} />
        </Modal>
      </div>
    );
};
