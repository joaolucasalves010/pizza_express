// components/Footer.tsx
import { Github, Instagram, Linkedin, User, Heart } from "lucide-react"

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white mt-16 shadow-inner">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8">

        <div className="flex flex-col md:flex-row justify-between gap-8">

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <User size={20} />
              joaolucasalves010
            </h2>

            <p className="text-sm text-white/80 flex items-center gap-1">
              Criado com <Heart size={14} className="text-red-300" /> por João Lucas Lima Alves
            </p>

            <p className="text-xs text-white/60 max-w-sm">
              Projeto desenvolvido para estudos e portfólio em desenvolvimento full-stack.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-sm">Redes sociais</h3>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/joaolucasalves010"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 rounded-full opacity-85 hover:opacity-100 hover:scale-110 transition-transform duration-200"
              >
                <Github size={18} />
              </a>

              <a
                href="https://instagram.com/joaolucasalves010"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 rounded-full opacity-85 hover:opacity-100 hover:scale-110 transition-transform duration-200"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/jo%C3%A3o-lucas-lima-alves-4b8004298/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 rounded-full opacity-85 hover:opacity-100 hover:scale-110 transition-transform duration-200"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/20 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-white/60">
          <span>© {new Date().getFullYear()} joaolucasalves010</span>
          <span>Todos os direitos reservados</span>
        </div>

      </div>
    </footer>
  )
}

export default Footer
