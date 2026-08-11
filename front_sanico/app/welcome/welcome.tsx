
export function Welcome() {
  return (
    <main className="min-h-screen flex bg-gray-400 m-0">
   
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
        

        <div className="">
        <div className=" flex flex-1   justify-between ">
          <div className="text-2xl font-bold justify-around flex gap-50 bg-white full-w min-h-full p-4 rounded-lg shadow-lg">
            <div>
               Welcome back,Lohran!
              <p className="text-lg text-gray-100">
                blablabla
              </p>

            </div>

              <div className="">
                <input type="text" placeholder="Pesquisar..." className="  bg-gray-200 border-px-0  text-sm  rounded-lg w-110 h-10" />
              </div>

              <div className="flex gap-4 ">
                <div className="">
                  <h1 className="text-lg font-semibold  ">Notificação</h1>
                </div>
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                  <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
                </div>
                <span className="text-lg font-semibold">Lohran</span>
                
                 
              </div>
              
          </div>
       
       </div>

      <div className="flex-1 flex bg-gray-600 p-4 rounded-lg shadow-lg m-4">
        gb

      </div>

      </div>
      
    </main>
  );
}
