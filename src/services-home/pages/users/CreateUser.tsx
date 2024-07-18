import { useForm } from "react-hook-form";
import { UserRequest } from "../../interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../../services/user.service";
import { useLoginStore } from "../../../auth/store/login.store";
import { CreateUserProps } from "../../interfaces/createUserProps";
import toast from "react-hot-toast";

export const CreateUser = ({ closeModal }: CreateUserProps) => {
  const initalValues: UserRequest = {
    name: "",
    dni: "",
    password: "",
    role: "",
  };

  const token = useLoginStore((set) => set.token);

  const { register, handleSubmit } = useForm({ defaultValues: initalValues });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: UserRequest) => UserService.createUser(data, token),
    onError: () => {
      toast.error("Todos los campos son Obligatorios");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      closeModal();
    },
  });

  const onSubmit = (data: UserRequest) => mutation.mutate(data);

  return (
    <div className="flex justify-center bg-slate-500 h-full w-72 pb-10 rounded-xl">
      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl text-center text-white font-bold mb-3">
          Crear Usuario
        </h2>
        <div>
          <label htmlFor="name" className="text-white block">
            Nombre completo:
          </label>
          <input type="text" id="name" {...register("name")} />
        </div>

        <div className="my-3">
          <label htmlFor="dni" className="text-white block">
            DNI:
          </label>
          <input type="text" id="dni" {...register("dni")} />
        </div>

        <div>
          <label htmlFor="password" className="text-white block">
            Password:
          </label>
          <input type="password" id="password" {...register("password")} />
        </div>

        <div>
          <label htmlFor="role" className="text-white block">
            Elija un Rol:
          </label>
          <select id="role" className="w-full rounded" {...register("role")}>
            <option value="">--- Seleccione ---</option>
            <option value="Administrador">Administrador</option>
            <option value="llantero">Llantero</option>
            <option value="trabajador">Trabajador</option>
          </select>
        </div>

        <div className="mt-5">
          <button
            className="bg-blue-500 w-full rounded py-1 text-white"
            type="submit"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
