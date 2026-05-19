import { Link, useParams } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { CATEGORIES } from '../../lib/categories'

export default function CategoryTabs({ basePath }) {
  const { categoria } = useParams()
  const { t } = useLang()

  return (
    <div className="flex gap-2 justify-center flex-wrap px-4 md:px-12 py-6 md:py-8 bg-[#1A1A1A] border-b border-white/[0.05]">
      {Object.entries(CATEGORIES).map(([key, cat]) => {
        const isActive = key === categoria
        return (
          <Link
            key={key}
            to={`${basePath}/${key}`}
            className={`text-[11px] tracking-[0.1em] uppercase px-[1.1rem] py-[0.45rem] rounded-[20px] border transition-all duration-[250ms] no-underline font-sans
              ${isActive
                ? 'bg-pink text-white border-pink'
                : 'bg-transparent text-white/50 border-white/15 hover:border-pink hover:text-pink-mid'
              }`}
          >
            {t(cat.es, cat.en)}
          </Link>
        )
      })}
    </div>
  )
}
