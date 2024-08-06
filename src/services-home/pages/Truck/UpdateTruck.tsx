import { useNavigate, useParams } from "react-router-dom";
import { BrandTruck } from "./data/marca";
import { useLoginStore } from "../../../auth/store/login.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TruckService } from "../../services/truck.service";
import { TruckRequest } from "../../interfaces";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const UpdateTruck = () => {
  const { id } = useParams();
  const token = useLoginStore((state) => state.token);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["userById", id],
    queryFn: () => TruckService.getTruckById(id!, token),
    enabled: !!token,
  });

  const mutation = useMutation({
    mutationFn: (request: TruckRequest) =>
      TruckService.updateTruck(request, id!, token),
    onError: () => {
      toast.error("Todos los campos son obligatorios");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trucks"] });
      navigate("/services/trucks", { replace: true });
    },
  });

  const { register, handleSubmit, reset } = useForm<TruckRequest>();

  useEffect(() => {
    if (data) {
      reset({
        marca: data.camion.marca,
        placa: data.camion.placa,
        dueno: data.camion.dueno || "",
        tolerancia_delantera: data.camion.tolerancia_delantera || 0,
        tolerancia_trasera: data.camion.tolerancia_trasera || 0,
        observation: data.camion.observation || "",
      });
    }
  }, [data, reset]);

  const onSubmit = (request: TruckRequest) => {
    mutation.mutate(request);
  };

  if (isLoading) return <p>Cargando...</p>;

  if (data)
    return (
      <div className="flex justify-center bg-zinc-300 h-screen ">
        <form className="mt-8 w-96" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl text-center  font-bold mb-3">Editar Camion</h2>
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
                className="w-full rounded"
                {...register("placa")}
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
              <button
                className="bg-blue-500 w-full rounded py-1 "
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
