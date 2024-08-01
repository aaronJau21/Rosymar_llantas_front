import { useNavigate, useParams } from "react-router-dom";
import { useLoginStore } from "../../../auth/store/login.store";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { TireService } from "../../services/tire.service";
import { TireRequest } from "../../interfaces/tireUpdate";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { medidas } from "./data/Medida";

export const UpdateTire = () => {
  const { id } = useParams();
  const token = useLoginStore((state) => state.token);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const results = useQueries({
    queries: [
      {
        queryKey: ["tireById", id],
        queryFn: () => TireService.getTireById(id!, token),
        enabled: !!token,
      },
      {
        queryKey: ["placas"],
        queryFn: () => TireService.getPlacas(token),
        enabled: !!token,
      },
      {
        queryKey: ["brandTire"],
        queryFn: () => TireService.getBranTire(token),
        enabled: !!token,
      },
    ],
  });

  const tireData = results[0].data?.tire;
  const placasData = results[1].data;
  const brandData = results[2].data;
  const isLoading = results[0].isLoading;

  const mutation = useMutation({
    mutationFn: (request: TireRequest) =>
      TireService.updateTire(request, id!, token),
    onError: () => {
      toast.error("Todos los campos son obligatorios");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tires"] });
      queryClient.invalidateQueries({ queryKey: ["tireById", id] });
      navigate("/services/tire", { replace: true });
    },
  });

  const { register, handleSubmit, reset } = useForm<TireRequest>();

  useEffect(() => {
    if (tireData) {
      reset({
        posicion: tireData.posicion || 0,
        KM_actutal: tireData.KM_actutal || "",
        brand_id: tireData.brand_id || 0,
        trucks_id: tireData.trucks_id || 0,
        modelo: tireData.modelo || "",
        medida: tireData.medida || "",
        R1: tireData.R1 || 0,
        R2: tireData.R2 || 0,
        R3: tireData.R3 || 0,
        estado: tireData.estado || "",
        observaciones: tireData.observaciones || "",
        presion_aire: tireData.presion_aire || 0,
        accion: tireData.accion || "",
      });
    }
  }, [tireData, reset]);

  const onSubmit = (request: TireRequest) => {
    mutation.mutate(request);
  };

  if (isLoading) return <p>Cargando...</p>;

  if (tireData)
    return (
      <div className="flex justify-center bg-zinc-300 h-screen">
        <form
          className="mt-8 sm:w-96 text-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-xl text-center font-bold mb-3">Editar Llanta</h2>

          <div className="grid sm:grid-cols-2 gap-x-5">
            <div>
              <label htmlFor="posicion" className="block">
                Posición:
              </label>
              <input type="number" id="posicion" {...register("posicion")} />
            </div>

            <div>
              <label htmlFor="trucks_id" className="block">
                Placa:
              </label>
              <select
                id="trucks_id"
                className="w-full"
                {...register("trucks_id")}
              >
                {placasData?.placa.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.placa}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="fecha_inspeccion" className="block">
                KM Actual:
              </label>
              <input
                type="text"
                id="fecha_inspeccion"
                {...register("KM_actutal")}
              />
            </div>

            <div>
              <label htmlFor="marca" className=" block">
                Marca:
              </label>
              <select id="marca" className="w-full" {...register("brand_id")}>
                {brandData?.brand_tires.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="modelo" className=" block">
                Modelo:
              </label>
              <select id="modelo" {...register("modelo")} className="w-full">
                {brandData?.brand_tires.map((b) => (
                  <option key={b.id} value={b.modelo}>
                    {b.modelo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="medida" className=" block">
                Medida:
              </label>
              {/* <input type="text" id="medida" /> */}
              <select id="medidas" {...register("medida")} className="w-full">
                {medidas.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="r1" className=" block">
                R1:
              </label>
              <input type="number" id="r1" {...register("R1")} />
            </div>

            <div>
              <label htmlFor="r2" className=" block">
                R2:
              </label>
              <input type="number" id="r2" {...register("R2")} />
            </div>

            <div>
              <label htmlFor="r3" className=" block">
                R3:
              </label>
              <input type="number" id="r3" {...register("R3")} />
            </div>

            <div>
              <label htmlFor="estado" className=" block">
                Estado:
              </label>
              <select id="estado" className="w-full" {...register("estado")}>
                <option value="">--- SELECCIONE ---</option>
                <option value="N">NUEVO</option>
                <option value="R">RENCAUCHADA</option>
              </select>
            </div>

            <div>
              <label htmlFor="presion_aire" className=" block">
                Presión aire:
              </label>
              <input
                type="number"
                id="presion_aire"
                {...register("presion_aire")}
              />
            </div>

            <div>
              <label htmlFor="accion" className=" block">
                Accion:
              </label>
              {/* <input type="text" id="accion" /> */}
              <select id="estado" className="w-full" {...register("accion")}>
                <option value="">--- SELECCIONE ---</option>
                <option value="INSPECCION">INSPECCION</option>
                <option value="CAMBIO">CAMBIO</option>
                <option value="NUEVA">NUEVA</option>
                <option value="USADA">USADA</option>
                <option value="RENCAUCHADA">RENCAUCHADA</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="observacion" className=" block">
              Observación
            </label>
            <textarea
              id="observacion"
              className="w-full"
              {...register("observaciones")}
            ></textarea>
          </div>
          <div className="mt-5">
            <button className="bg-blue-500 w-full rounded py-1" type="submit">
              Guardar
            </button>
          </div>
        </form>
      </div>
    );
};
