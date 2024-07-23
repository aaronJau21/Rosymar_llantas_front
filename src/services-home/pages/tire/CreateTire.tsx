import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLoginStore } from "../../../auth/store/login.store";
import { TireService } from "../../services/tire.service";
import { useNavigate } from "react-router-dom";
import { medidas } from "./data/Medida";

export interface InputsCreateTire {
  posicion: number;
  KM_actutal: string;
  brand_id: number;
  trucks_id: number;
  modelo: string;
  medida: string;
  R1: number;
  R2: number;
  R3: number;
  estado: string;
  observaciones: string;
  presion_aire: string;
  accion: string;
}

export const CreateTire = () => {
  const initalValues: InputsCreateTire = {
    posicion: 0,
    KM_actutal: "",
    brand_id: 0,
    trucks_id: 0,
    modelo: "",
    medida: "",
    R1: 0,
    R2: 0,
    R3: 0,
    estado: "",
    observaciones: "",
    presion_aire: "",
    accion: "",
  };

  const token = useLoginStore((set) => set.token);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({ defaultValues: initalValues });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: InputsCreateTire) => TireService.createTire(data, token),
    onError: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tires"] });
      navigate("/services/tire");
    },
  });

  const queries = useQueries({
    queries: [
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

  const onSubmit = (data: InputsCreateTire) => mutation.mutate(data);

  return (
    <div className="flex justify-center bg-zinc-300 h-screen ">
      <form className="mt-8 w-96 text-center" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl text-center  font-bold mb-3">Crear Llanta</h2>

        <div className="grid grid-cols-2 gap-x-5">
          <div>
            <label htmlFor="posicion" className=" block">
              Posición:
            </label>
            <input type="number" id="posicion" {...register("posicion")} />
          </div>

          <div>
            <label htmlFor="posicion" className=" block">
              Placa:
            </label>
            <select id="placas" className="w-full" {...register("trucks_id")}>
              <option value="">--- Seleccione ---</option>
              {queries[0].data?.placa.map((p) => (
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
              <option value="">--- Seleccione ---</option>
              {queries[1].data?.brand_tires.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="modelo" className=" block">
              Modelo:
            </label>
            <select id="modelo" {...register("modelo")} className="w-full">
              <option value="">--- Seleccione ---</option>
              {queries[1].data?.brand_tires.map((brand) => (
                <option key={brand.id} value={brand.modelo}>
                  {brand.modelo}
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
              <option value="">--- Seleccione ---</option>
              {medidas.map((medida) => (
                <option key={medida} value={medida}>
                  {medida}
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
          <button className="bg-blue-500 w-full rounded py-1 " type="submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
