import { NavLink } from "react-router-dom";
import { TitlePage } from "../../components/TitlePage";
import { useState } from "react";
import Modal from "react-modal";
import { CreateTire } from "./CreateTire";
import { CreateBrandTire } from "./brand/CreateBrandTire";

export const Tire = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenBrand, setModalIsOpenBrand] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModalBrand = () => {
    setModalIsOpenBrand(true);
  };

  const closeModalBrand = () => {
    setModalIsOpenBrand(false);
  };

  return (
    <div>
      <TitlePage title="Llantas" />

      <div className="mt-9">
        <button
          className="bg-green-600 text-white px-3 py-1 rounded mb-5"
          onClick={() => openModal()}
        >
          Crear Llanta
        </button>
        <button
          className="bg-green-600 text-white px-3 py-1 ml-5 rounded mb-5"
          onClick={() => openModalBrand()}
        >
          Crear Marca de Llanta
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
                  Posición
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha Inspeccion
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
                  medida
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  R1
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  R2
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  R3
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Estado
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="flex justify-center mt-28"
      >
        <CreateTire closeModal={closeModal} />
      </Modal>

      <Modal
        isOpen={modalIsOpenBrand}
        onRequestClose={closeModalBrand}
        className="flex justify-center mt-28"
      >
        <CreateBrandTire />
      </Modal>
    </div>
  );
};
