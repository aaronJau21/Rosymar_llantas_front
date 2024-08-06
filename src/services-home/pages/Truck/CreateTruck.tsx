import { useForm } from "react-hook-form";
import { useLoginStore } from "../../../auth/store/login.store";
import { TruckRequest } from "../../interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TruckService } from "../../services/truck.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BrandTruck } from "./data/marca";

export const CreateTruck = () => {
  const initalValues: TruckRequest = {
    dueno: "",
    tolerancia_delantera: 0,
    tolerancia_trasera: 0,
    marca: "",
    placa: "",
    observation: "",
  };

  const token = useLoginStore((set) => set.token);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({ defaultValues: initalValues });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: TruckRequest) => TruckService.createTruck(data, token),
    onError: () => {
      toast.error("Todos los campos son Obligatorios");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trucks"] });
      navigate("/services/trucks");
    },
  });

  const onSubmit = (data: TruckRequest) => mutation.mutate(data);

  return (
    <div className="flex justify-center bg-zinc-300 h-screen ">
      <form className="mt-8 w-96" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl text-center  font-bold mb-3">Crear Camion</h2>
        <div className="bg-zinc-400 p-5 rounded-md">
          <div>
            <label htmlFor="marca" className=" block">
              Marca:
            </label>
            <select
              id="marca"
              className="w-full rounded"
              {...register("marca")}
            >
              <option value="">--- Elija Marva ---</option>
              {BrandTruck.map((Brand) => (
                <option key={Brand} value={Brand}>
                  {Brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="placa" className=" block">
              Placa:
            </label>
            <input
              type="text"
              id="placa"
              {...register("placa")}
              className="w-full rounded"
            />
          </div>

          <div className="my-3">
            <label htmlFor="dueno" className="block">
              Dueño:
            </label>
            <input
              type="text"
              id="dueno"
              className="w-full"
              {...register("dueno")}
            />
          </div>

          <div className="my-3">
            <label htmlFor="tolerancia_delantera" className="block">
              Tolerancia Delantera:
            </label>
            <input
              type="number"
              id="tolerancia_delantera"
              className="w-full"
              {...register("tolerancia_delantera")}
            />
          </div>

          <div className="my-3">
            <label htmlFor="tolerancia_trasera" className="block">
              Tolerancia trasera:
            </label>
            <input
              type="number"
              id="tolerancia_trasera"
              className="w-full"
              {...register("tolerancia_trasera")}
            />
          </div>

          <div className="my-3">
            <label htmlFor="observation" className=" block">
              Observaciones:
            </label>
            <textarea
              className="w-full"
              id="observation"
              {...register("observation")}
            ></textarea>
          </div>

          <div className="mt-5">
            <button className="bg-blue-500 w-full rounded py-1 " type="submit">
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
