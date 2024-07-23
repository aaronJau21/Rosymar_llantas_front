import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { TireService } from "../../../services/tire.service";
import { useLoginStore } from "../../../../auth/store/login.store";
import { useNavigate } from "react-router-dom";

export interface InputsCreateBrandTire {
  nombre: string;
  modelo: string;
}

export const CreateBrandTire = () => {
  const initalValues: InputsCreateBrandTire = {
    nombre: "",
    modelo: "",
  };

  const token = useLoginStore((set) => set.token);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({ defaultValues: initalValues });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: InputsCreateBrandTire) =>
      TireService.createBrandTire(data, token),
    onError: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brandTire"] });
      navigate("/services/tire");
    },
  });

  const onSubmit = (data: InputsCreateBrandTire) => mutation.mutate(data);

  return (
    <div className="flex justify-center bg-zinc-300 h-screen">
      <form className="mt-8 w-80 text-center" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl text-center  font-bold mb-3">
          Crear Marca de Llanta
        </h2>

        <div className="bg-zinc-400 p-5 rounded">
          <div>
            <label htmlFor="name" className=" block">
              Marca:
            </label>
            <input
              type="text"
              id="name"
              className="w-full"
              {...register("nombre")}
            />
          </div>

          <div>
            <label htmlFor="name" className=" block">
              Modelo:
            </label>
            <input
              type="text"
              id="name"
              className="w-full"
              {...register("modelo")}
            />
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
