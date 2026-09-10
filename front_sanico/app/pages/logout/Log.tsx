import {
  Mail,
  GraduationCap,
  ArrowRight,
  Eye,
  Lock,
  GraduationCapIcon,
  Users,
  BarChart3,
  Zap,
}from "lucide-react";
import login from "./frente.jpeg";
import { useNavigate } from "react-router";
import { useState } from "react";

export function Log() {
  const navigate = useNavigate();

  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");

  const handlelogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "admin@educontrol.com" && password === "244466666") {
      navigate("/home");
    } else {
      alert("E-mail ou senha incorretos.");
    }
  };
  return (
    <main className="app-shell">
      <div className="relative hidden h-screen w-1/2 overflow-hidden lg:block">
      <img
         src={login}
         alt="Imagem de login"
         className="h-full w-full object-cover"
       />

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
        Welcome back!
      </h2>
      <p className="app-login-description">
        Please enter your details
      </p>
    </div>
      

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
            onChange={(e) => setEmail(e.target.value)}className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 outline-none focus:border-[#0d7f70] dark:border-white/15 dark:bg-[#151515] dark:text-white dark:focus:border-[#22c7a9]"
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 outline-none focus:border-[#0d7f70] dark:border-white/15 dark:bg-[#151515] dark:text-white dark:focus:border-[#22c7a9]"
          />

          <Eye
            size={20}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
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
    </main>
  );
}
