import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { UserService } from "../../services/user.service";
import { useNavigate, useParams } from "react-router-dom";
import { useLoginStore } from "../../../auth/store/login.store";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export interface UserUpdateRequest {
  name: string;
  dni: string;
  role: string;
}

export const EditUser = () => {
  const { id } = useParams();
  const token = useLoginStore((state) => state.token);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["userById", id],
    queryFn: () => UserService.getUsertById(parseInt(id!), token),
    enabled: !!token,
  });

  const mutation = useMutation({
    mutationFn: (userUpdateRequest: UserUpdateRequest) =>
      UserService.editUser(userUpdateRequest, id!, token),
    onError: () => {
      toast.error("Todos los campos son obligatorios");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/services/users", { replace: true });
      toast.success("Usuario actualizado con éxito");
    },
  });

  const { register, handleSubmit, reset } = useForm<UserUpdateRequest>();

  useEffect(() => {
    if (data) {
      reset({
        name: data.user?.name,
        dni: data.user.dni,
        role: data.user.role,
      });
    }
  }, [data, reset]);

  const onSubmit = (userUpdateRequest: UserUpdateRequest) => {
    mutation.mutate(userUpdateRequest);
  };

  if (isLoading) return <p>Cargando...</p>;

  if (error) return <p>Error al cargar el usuario: {error.message}</p>;

  return (
    <div className="flex justify-center bg-zinc-300 h-screen">
      <form className="mt-8 s:w-96" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl text-center font-bold mb-3">Editar Usuario</h2>
        <div>
          <label htmlFor="name" className="block">
            Nombre completo:
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "El nombre es obligatorio" })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="my-3">
          <label htmlFor="dni" className="block">
            DNI:
          </label>
          <input
            type="text"
            id="dni"
            {...register("dni", { required: "El DNI es obligatorio" })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div>
          <label htmlFor="role" className="block">
            Elija un Rol:
          </label>
          <select
            id="role"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            {...register("role", { required: "El rol es obligatorio" })}
          >
            <option value="Administrador">Administrador</option>
            <option value="llantero">Llantero</option>
            <option value="trabajador">Trabajador</option>
          </select>
        </div>
        <div className="mt-5">
          <button className="bg-blue-500 w-full rounded py-1" type="submit">
            Guardar
          </button>
        </div>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};
