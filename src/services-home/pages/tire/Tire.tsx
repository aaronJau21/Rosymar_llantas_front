import { NavLink } from "react-router-dom";
import { TitlePage } from "../../components/TitlePage";
import { useQuery } from "@tanstack/react-query";
import { useLoginStore } from "../../../auth/store/login.store";
import { TireService } from "../../services/tire.service";

export const Tire = () => {
  const token = useLoginStore((set) => set.token);
  const { data, isLoading } = useQuery({
    queryKey: ["tires"],
    queryFn: () => TireService.getTires(token),
    enabled: !!token,
  });

  const exportExcel = async () => {
    await TireService.exportTire(token);
  };

  if (isLoading) return "Cargando data...";
  if (data)
    return (
      <div>
        <TitlePage title="Llantas" />

        <div className="mt-9">
          <div className="lg:flex lg:justify-between">
            <div className="hidden lg:flex">
              <NavLink
                to="/services/tire/create"
                className="bg-green-600 text-white px-3 py-1 rounded mb-5"
              >
                Crear Llanta
              </NavLink>
              <NavLink
                to="/services/tire/create/brand"
                className="bg-green-600 text-white px-3 py-1 ml-5 rounded mb-5"
              >
                Crear Marca de Llanta
              </NavLink>
              <NavLink
                to="/home"
                className="bg-red-600 text-white px-3 py-1 rounded ml-5 mb-5"
              >
                Volver
              </NavLink>
            </div>
            <NavLink
              to="/services/tire/create"
              className="bg-green-600 text-white px-3 py-1 rounded mb-5 lg:hidden"
            >
              Crear Llanta
            </NavLink>
            <NavLink
              to="/services/tire/create/brand"
              className="bg-green-600 text-white px-3 py-1 ml-5 rounded mb-5 lg:hidden"
            >
              Crear Marca de Llanta
            </NavLink>
            <NavLink
              to="/home"
              className="bg-red-600 text-white px-3 py-1 rounded ml-5 mb-5 lg:hidden"
            >
              Volver
            </NavLink>
            <button
              onClick={() => exportExcel()}
              className="bg-green-400 text-white px-3 py-1 flex gap-x-2 rounded lg:ml-5 mb-5 mt-3 lg:mt-0"
            >
              Export
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                />
              </svg>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Numero de Reporte
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Placa
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    KM Actual
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Marca P.O.S
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Medida
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
                    Presion de Aire
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Estado
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Accion
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.tires.map((d) => (
                  <tr key={d.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                      {d.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                      {d.truck.placa}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                      {d.KM_actutal}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                      {d.brand_tire.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                      {d.medida}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                      {d.brand_tire.modelo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                      {d.R1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                      {d.R2}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                      {d.R3}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                      {d.presion_aire}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                      {d.estado}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                      {d.accion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                      <div className="flex gap-x-5">
                        <NavLink to={`/services/tire/${d.id}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                          </svg>
                        </NavLink>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};
