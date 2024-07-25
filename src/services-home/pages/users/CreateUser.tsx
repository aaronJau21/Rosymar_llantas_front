import { useForm } from "react-hook-form";
import { UserRequest } from "../../interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../../services/user.service";
import { useLoginStore } from "../../../auth/store/login.store";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const CreateUser = () => {
  const initalValues: UserRequest = {
    name: "",
    dni: "",
    password: "",
    role: "",
  };

  const token = useLoginStore((set) => set.token);

  const { register, handleSubmit } = useForm({ defaultValues: initalValues });
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: UserRequest) => UserService.createUser(data, token),
    onError: () => {
      toast.error("Todos los campos son Obligatorios");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/services/users");
    },
  });

  const onSubmit = (data: UserRequest) => mutation.mutate(data);

  return (
    <div className="flex justify-center bg-zinc-300 h-screen">
      <form className="mt-8 s:w-96" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl text-center  font-bold mb-3">Crear Usuario</h2>
        <div>
          <label htmlFor="name" className=" block">
            Nombre completo:
          </label>
          <input type="text" id="name" {...register("name")} />
        </div>

        <div className="my-3">
          <label htmlFor="dni" className=" block">
            DNI:
          </label>
          <input type="text" id="dni" {...register("dni")} />
        </div>

        <div>
          <label htmlFor="password" className=" block">
            Password:
          </label>
          <input type="password" id="password" {...register("password")} />
        </div>

        <div>
          <label htmlFor="role" className=" block">
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
          <button className="bg-blue-500 w-full rounded py-1 " type="submit">
            Guardar
          </button>
        </div>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};
