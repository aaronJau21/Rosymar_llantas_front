import { useForm } from "react-hook-form";
import { useLoginStore } from "../../../auth/store/login.store";
import { TruckRequest } from "../../interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TruckService } from "../../services/truck.service";
import toast from "react-hot-toast";

export const CreateTruck = ({ closeModal }: { closeModal: () => void }) => {
  const initalValues: TruckRequest = {
    cantidad_llantas: 0,
    marca: "",
    modelo: "",
    placa: "",
  };

  const token = useLoginStore((set) => set.token);

  const { register, handleSubmit } = useForm({ defaultValues: initalValues });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: TruckRequest) => TruckService.createTruck(data, token),
    onError: () => {
      toast.error("Todos los campos son Obligatorios");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trucks"] });
      closeModal();
    },
  });

  const onSubmit = (data: TruckRequest) => mutation.mutate(data);

  return (
    <div className="flex justify-center bg-slate-500 h-full w-72 pb-10 rounded-xl">
      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl text-center text-white font-bold mb-3">
          Crear Camion
        </h2>
        <div>
          <div>
            <label htmlFor="marca" className="text-white block">
              Marca:
            </label>
            <input type="text" id="marca" {...register("marca")} />
          </div>

          <div className="my-3">
            <label htmlFor="modelo" className="text-white block">
              Modelo:
            </label>
            <input type="text" id="modelo" {...register("modelo")} />
          </div>

          <div>
            <label htmlFor="placa" className="text-white block">
              Placa:
            </label>
            <input type="text" id="placa" {...register("placa")} />
          </div>

          <div className="my-3">
            <label htmlFor="cantidad_llantas" className="text-white block">
              Cantidad de llantas:
            </label>
            <input
              type="text"
              id="cantidad_llantas"
              {...register("cantidad_llantas")}
            />
          </div>

          <div className="mt-5">
            <button
              className="bg-blue-500 w-full rounded py-1 text-white"
              type="submit"
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
