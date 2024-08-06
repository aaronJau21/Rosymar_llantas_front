import { NavLink } from "react-router-dom";
import { TitlePage } from "../../components/TitlePage";
import { useLoginStore } from "../../../auth/store/login.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TruckService } from "../../services/truck.service";
import toast from "react-hot-toast";

export const Trucks = () => {
  const token = useLoginStore((set) => set.token);

  const { data, isLoading } = useQuery({
    queryKey: ["trucks"],
    queryFn: () => TruckService.getAllTrucks(token),
    enabled: !!token,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => TruckService.deleteTruck(id, token),
    onError: () => {
      toast.error("Error al eliminar");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trucks"] });
      toast.success("Usuario actualizado con éxito");
    },
  });

  const onDelete = (id: number) => mutation.mutate(id);

  const exportExcel = async () => {
    await TruckService.exportTrucks(token);
  };

  if (isLoading) return "Cargando data...";

  if (data)
    return (
      <div>
        <TitlePage title="Camiones" />

        <div className="mt-9">
          <div className="flex justify-between">
            <div>
              <NavLink
                to="/services/trucks/create"
                className="bg-green-600 text-white px-3 py-1 rounded mb-5"
              >
                Crear
              </NavLink>
              <NavLink
                to="/home"
                className="bg-red-600 text-white px-3 py-1 rounded ml-5 mb-5"
              >
                Volver
              </NavLink>
            </div>
            <button
              onClick={() => exportExcel()}
              className="bg-green-400 text-white px-3 py-1 flex gap-x-2 rounded ml-5 mb-5"
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
                    placa
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.trucks.map((truck) => (
                  <tr key={truck.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                      {truck.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                      {truck.marca}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                      {truck.placa}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                      <div className="flex gap-x-5">
                        <NavLink to={`/services/trucks/${truck.id}`}>
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
                          onClick={() => onDelete(truck.id)}
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
