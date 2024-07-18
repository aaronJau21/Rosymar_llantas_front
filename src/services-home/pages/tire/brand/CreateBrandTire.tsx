export const CreateBrandTire = () => {
  return (
    <div className="flex justify-center bg-slate-500 h-full w-96 pb-10 rounded-xl">
      <form className="mt-8 w-80 text-center">
        <h2 className="text-xl text-center text-white font-bold mb-3">
          Crear Marca de Llanta
        </h2>

        <div>
          <label htmlFor="name" className="text-white block">
            Nombre de la Marca:
          </label>
          <input type="text" id="name" className="w-full" />
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
