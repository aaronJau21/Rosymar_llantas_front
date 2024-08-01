import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../../../auth/store/login.store";
import { LogoutService } from "../../services/logout.service";

export const Logout = () => {
  const token = useLoginStore((state) => state.token);
  const setToken = useLoginStore((set) => set.setToken);
  const setUser = useLoginStore((set) => set.setUser);

  const naviagete = useNavigate();

  const logout = async () => {
    await LogoutService.logoutSesion(token);
    setToken("");
    setUser({ dni: "", name: "", role: "" });
    naviagete("/login");
  };

  return (
    <div
      className="flex justify-end mr-9 mt-5 cursor-pointer"
      onClick={() => logout()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
        />
      </svg>
    </div>
  );
};
