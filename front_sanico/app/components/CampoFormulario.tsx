export function CampoFormulario({ rotulo, erro, children, className = "" }: any) {
  return (
    <div className={className}>
      <label className="mb-1 block text-xs text-gray-500 dark:text-[#8fb1aa]">{rotulo}</label>
      {children}
      {erro && <p className="mt-1 text-xs text-red-500">{erro}</p>}
    </div>
  );
}
