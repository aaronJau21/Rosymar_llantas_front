import { useLoginStore } from "../../auth/store/login.store";
import { HomeAdmin } from "../components/HomeAdmin";
import { HomeLlantero } from "../components/HomeLlantero";
import { Logout } from "../components/sub-components/Logout";

export const Home = () => {
  const user = useLoginStore((set) => set.user);
  if (!user) {
    return <div>Cargando...</div>;
  }

  if (user.role === "Administrador")
    return (
      <>
        <Logout />
        <div>
          <h2 className="text-3xl text-center mt-5 ">Elija el Mantenimiento</h2>

          <div className="flex justify-center mt-11">
            <HomeAdmin />
          </div>
        </div>
      </>
    );

  if (user.role === "llantero")
    return (
      <>
        <Logout />
        <div>
          <h2 className="text-3xl text-center">
            Elija el Mantenimiento Llantero
          </h2>
          <div className="flex justify-center mt-11">
            <HomeLlantero />
          </div>
        </div>
      </>
    );
};
