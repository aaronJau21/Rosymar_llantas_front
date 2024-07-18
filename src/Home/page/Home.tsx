import { NavLink } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <h2 className="text-3xl text-center mt-5 ">Elija el Mantenimiento</h2>

      <div className="flex justify-center mt-11">
        <div className="grid grid-cols-2 gap-x-5 gap-y-5">
          <NavLink to="/services/users" className="bg-slate-300 rounded-md shadow-2xl w-36 py-3 text-center hover:bg-slate-500 transition-colors cursor-pointer">
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
                strokeWidth={ 1.5 }
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 
                  1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 
                  0-4.512-.645-6.374-1.766Z"
                />
              </svg>
            </div>
            <p>Crear Usuario</p>
          </NavLink>
          <NavLink to="/services/trucks" className="bg-slate-300 rounded-md shadow-2xl w-36 py-3 text-center hover:bg-slate-500 transition-colors cursor-pointer">
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={ 1.5 }
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 
                0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 
                0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 
                18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 
                0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>

            </div>
            <p>Crear Camión</p>
          </NavLink>
          <NavLink to='/services/tire' className="bg-slate-300 rounded-md shadow-2xl w-36 py-3 text-center hover:bg-slate-500 transition-colors cursor-pointer">
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={ 1.5 }
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 
                  0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 
                  1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 
                  17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 
                  12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 
                  9.435l-1.41-.514M12.002 12l-3.75 6.495"
                />
              </svg>
            </div>
            <p>Crear Llantas</p>
          </NavLink>
        </div>
      </div>

    </div>
  );
};