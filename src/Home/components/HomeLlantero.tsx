import { NavLink } from "react-router-dom";
import { Alineamiento } from "./sub-components/Alineamiento";
import { Llantas } from "./sub-components/Llantas";

export const HomeLlantero = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-x-5 gap-y-5">
        <NavLink
          to="/services/trucks"
          className="bg-slate-300 rounded-md shadow-2xl w-36 py-3 text-center hover:bg-slate-500 transition-colors cursor-pointer"
        >
          <Alineamiento />
        </NavLink>
        <NavLink
          to="/services/tire"
          className="bg-slate-300 rounded-md shadow-2xl w-36 py-3 text-center hover:bg-slate-500 transition-colors cursor-pointer"
        >
          <Llantas />
        </NavLink>
      </div>
    </>
  );
};
