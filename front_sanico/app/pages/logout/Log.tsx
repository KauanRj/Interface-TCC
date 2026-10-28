import {
  Mail,
  GraduationCap,
  ArrowRight,
  Eye,
  EyeOff,
  Lock, 
  Users,
  BarChart3,
  Zap,
}from "lucide-react";
import { useNavigate } from "react-router";
import { fazerLogin } from "~/auth/sessao";
import { useState } from "react";

export function Log() {
  const navigate = useNavigate();

  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[showPassword, setShowPassword ] = useState(false)
  const[mensagemErro,setMensagemErro] = useState("");

  const handlelogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensagemErro("");

    const usuario = fazerLogin(email, password);

    if (usuario !== null) {
      navigate("/home");
    } else {
      setMensagemErro("E-mail ou senha incorretos.");
    }
  };
  return (
    <main className="app-login-shell">
      <div className="app-login-container">
      <div className="relative hidden h-screen w-1/2 overflow-hidden lg:block bg-[#0d4c5c]">

       <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10"></div>
       <div className="pointer-events-none absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-white/[0.07]"></div>
       <div className="pointer-events-none absolute right-10 top-[55%] h-24 w-24 rounded-full bg-white/5"></div>
      

       <div className="app-login-rigth">

        <div className="app-login-brand">
         <div className="app-login-logo">
           <GraduationCap className="app-login-logo-icon" />

            <span className="app-login-logo-text">
             <span className="app-login-logo-edu">Edu</span>
             <span className="app-login-logo-control">Control</span>
           </span>
         </div>

         <p className="app-login-subtitle">
           Gestão escolar
         </p>


         </div>


        <div className="app-login-info">
          <div className="app-login-welcome-text"> 
             <span className="app-login-welcome-bem">Bem-</span>
             <span className="app-login-welcome-vindo">vindo</span>
          </div>

          <p className="app-login-welcome-description">
            Tenha uma gestão escolar mais simples,organizada e eficiente
          </p>

          <div className="app-login-features">
             <div className="app-login-feature">
              <div className="app-login-feature-icon">
               <Users
                 size={22}/>
              </div>

              <div>
              <h3> Gestão completa</h3>
                <p>
                 Sistema completo de gestão escolar, com acompanhamento dos alunos, professores, turmas e muito mais.
                </p>
              </div>
             </div>
          
          <div className="app-login-feature">
             <div className="app-login-feature-icon">
               <BarChart3
                 size={22}/>
             </div>

             <div>
              <h3> Praticidade</h3>
                <p>
                 Uma plataforma intuitiva para facilitar sua rotina.
                </p>
             </div>

          </div>
          <div className="app-login-feature">
             <div className="app-login-feature-icon">
               <Zap
                 size={22}/>
             </div>

             <div>
              <h3> Acompanhamento escolar</h3>
                <p>
                 Acompanhe alunos, presença e desempenho com facilidade.
                </p>
             </div>
          </div>
        </div>
      </div>
        
      </div>

      </div>

      
      <section className="flex h-screen w-full items-start justify-center overflow-hidden px-6  lg:w-1/2">
      <div className="w-full max-w-md pt-24 ">

    <form 
    onSubmit={handlelogin}
    className="mx-auto w-full max-w-md">

    <div className="app-login-welcome">
      <h2 className="app-login-title2">
        Seja bem vindo!
      </h2>
      <p className="app-login-description">
        Por favor insira seus dados
      </p>
    </div>

      {mensagemErro !== "" && (
        <p role="alert" className="mb-4 rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {mensagemErro}
        </p>
      )}
      

      <div className="mb-4 flex flex-col gap-2">
        <label htmlFor="email" className="font-medium text-white/60">
          E-mail
        </label>

        <div className="relative">
          <Mail
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 outline-none focus:border-[#0d7f70] dark:border-white/15 dark:bg-[#151515] dark:text-white dark:focus:border-[#22c7a9]"
          />
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <label htmlFor="password" className="font-medium text-white/60">
          Senha
        </label>

        <div className="relative">
          <Lock
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            id="password"
            type={showPassword  ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 outline-none focus:border-[#0d7f70] dark:border-white/15 dark:bg-[#151515] dark:text-white dark:focus:border-[#22c7a9]"
          />
          <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="app-login-show">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="mb-4 flex justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 accent-[#7aaeb8]"
          />

          <span className="text-sm text-gray-300">
            Lembrar de mim
          </span>
        </label>

        <a
          href="#"
          className="app-login-forgot"
        >
          Esqueceu sua senha?
        </a>
      </div>

      <button
        type="submit"
        className="app-button-entrar"
      >
        <div className="flex items-center justify-center">
          Entrar
        </div>

        <ArrowRight
          size={20}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        />
      </button>

     <div className="app-login-divider">
       <span></span>
       <p>ou continue</p>
       <span></span>
     </div>

     <button
     type="button"
     className="app-google-button"
     >
      <span className="app-google-icon">G </span>
      <span>Entrar com o Google</span>
     </button>

     
         </form>
       </div>
      </section>
      </div>
    </main>
  );
}
