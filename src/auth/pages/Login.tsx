import { useForm } from "react-hook-form";
import { InputsLogin } from "../types/login.type";
import { useMutation } from "@tanstack/react-query";
import { LoginService } from "../services/login.service";
import { LoginResponse } from "../interfaces";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../store/login.store";

export const Login = () => {
  const navigate = useNavigate();
  const setToken = useLoginStore((state) => state.setToken);
  const setUser = useLoginStore((state) => state.setUser);

  const initalValues: InputsLogin = {
    dni: "",
    password: "",
  };

  const { register, handleSubmit } = useForm({ defaultValues: initalValues });

  const mutation = useMutation({
    mutationFn: LoginService.login,
    onError: () => {
      toast.error("Error en los datos");
    },
    onSuccess: (data: LoginResponse) => {
      // console.log( data );
      setToken(data.token);
      setUser(data.user);
      toast.success("Se Logio Correctamente");
      navigate("/home");
    },
  });

  const onSubmit = (data: InputsLogin) => mutation.mutate(data);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="dni"
                className="block text-sm font-medium text-gray-700"
              >
                DNI
              </label>
              <input
                id="dni"
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register("dni")}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register("password")}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
