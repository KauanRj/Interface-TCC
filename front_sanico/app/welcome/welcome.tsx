
export function Welcome() {
  return (
    <main className="min-h-screen flex bg-gray-100 m-0">
   
      <div className="w-56 flex flex-col bg-gray-800 text-white p-4 m-0 rounded-lg shadow-lg block-screen ">
        
          <h1 className="text-2xl font-bold mb-4">Home</h1>
          <div className="font-semibold text-sm space-y-8">
            <p>Início</p>
            <p>relatorio</p>
            <p>Assistente de IA</p>
            <p>Team</p>
            <p>Presenca</p>
            <p>Sala</p>
            <p>Alunos</p>
            <p>Configurações</p>


          </div>
        
      </div>
        

        <div className="flex-1 flex flex-col">
          <div className="w-full bg-white p-4 shadow-lg flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Lohran!</h1>
              <p className="text-lg text-gray-500">blablabla</p>
            </div>

            <div>
              <input
                type="text"
                placeholder="Pesquisar..."
                className="bg-gray-200 text-sm rounded-lg w-80 h-10 px-4"
              />
            </div>

            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold">Notificação</h1>
              <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="rounded-full"
                />
              </div>
              <span className="text-lg font-semibold">Lohran</span>
            </div>
          </div>

          <div className="flex-1 bg-gray-600 p-4 rounded-lg shadow-lg m-4">
            gb
          </div>
        </div>
      
    </main>
  );
}
