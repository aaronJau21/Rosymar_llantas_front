export const CreateTire = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className="flex justify-center bg-slate-500 h-full w-96 pb-10 rounded-xl">
      <form className="mt-8 w-80 text-center">
        <h2 className="text-xl text-center text-white font-bold mb-3">
          Crear Llanta
        </h2>

        <div>
          <label htmlFor="posicion" className="text-white block">
            Posición:
          </label>
          <input type="text" id="posicion" className="w-full" />
        </div>

        <div>
          <label htmlFor="fecha_inspeccion" className="text-white block">
            Fecha Inspeccion:
          </label>
          <input type="date" id="fecha_inspeccion" className="w-full" />
        </div>

        <div>
          <label htmlFor="marca" className="text-white block">
            Marca:
          </label>
          <input type="text" id="marca" className="w-full" />
        </div>

        <div>
          <label htmlFor="modelo" className="text-white block">
            Modelo:
          </label>
          <input type="text" id="modelo" className="w-full" />
        </div>

        <div>
          <label htmlFor="medida" className="text-white block">
            Medida:
          </label>
          <input type="text" id="medida" className="w-full" />
        </div>

        <div>
          <label htmlFor="r1" className="text-white block">
            R1:
          </label>
          <input type="text" id="r1" className="w-full" />
        </div>

        <div>
          <label htmlFor="r2" className="text-white block">
            R2:
          </label>
          <input type="text" id="r2" className="w-full" />
        </div>

        <div>
          <label htmlFor="r3" className="text-white block">
            R3:
          </label>
          <input type="text" id="r3" className="w-full" />
        </div>

        <div>
          <label htmlFor="estado" className="text-white block">
            Estado:
          </label>
          <select id="estado" className="w-full">
            <option value="">--- SELECCIONE ---</option>
            <option value="I">I</option>
            <option value="N">N</option>
            <option value="R">R</option>
          </select>
        </div>

        <div>
          <label htmlFor="observacion" className="text-white block">
            Observación
          </label>
          <textarea id="observacion" className="w-full"></textarea>
        </div>

        <div>
          <label htmlFor="presion_aire" className="text-white block">
            Presión aire:
          </label>
          <input type="text" id="presion_aire" className="w-full" />
        </div>

        <div>
          <label htmlFor="rotaciones" className="text-white block">
            Rotaciones:
          </label>
          <input type="text" id="rotaciones" className="w-full" />
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
