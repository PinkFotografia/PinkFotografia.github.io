import { Link, useParams } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { CATEGORIES } from '../../lib/categories'

export default function CategoryTabs({ basePath, categories }) {
  const { categoria } = useParams()
  const { t } = useLang()
  const cats = categories || CATEGORIES

  return (
    <div className="sticky top-[80px] z-[100] bg-[#1A1A1A] border-b border-white/[0.05]">
      <div className="flex flex-wrap gap-2 px-4 py-3 justify-center">
        {Object.entries(cats).map(([key, cat]) => {
          const isActive = key === categoria
          return (
            <Link
              key={key}
              to={`${basePath}/${key}`}
              className={`text-[11px] tracking-[0.08em] uppercase px-4 py-[0.4rem] rounded-[20px] border transition-all duration-[250ms] no-underline font-sans
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
    </div>
  )
}
