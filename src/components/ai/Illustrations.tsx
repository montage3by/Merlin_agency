// Иллюстрации для плашек услуг: иконки из библиотеки Phosphor (не нарисованы
// от руки), собранные вместе с реальными тегами услуги — у каждой плашки
// своя композиция, чтобы они не читались как три одинаковых значка.
import {
  ArrowUpRight,
  ChartLineUp,
  MagnifyingGlass,
  Target,
} from "@phosphor-icons/react/dist/ssr";

type ArtProps = { className?: string; tags: string[] };

function Chip({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-current/25 bg-current/10 px-3 py-1 text-xs font-bold uppercase tracking-wide">
      {children}
    </span>
  );
}

// Иконка внизу справа, теги столбиком вверху слева.
export function SearchArt({ className = "", tags }: ArtProps) {
  return (
    <div className={`${className} flex flex-col justify-between p-2`}>
      <div className="flex flex-col items-start gap-2">
        {tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>
      <MagnifyingGlass
        weight="duotone"
        className="ml-auto h-[46%] w-auto -rotate-6 opacity-95"
      />
    </div>
  );
}

// Иконка вверху слева, теги строкой внизу.
export function GrowthArt({ className = "", tags }: ArtProps) {
  return (
    <div className={`${className} flex flex-col justify-between p-2`}>
      <div className="flex h-[42%] items-center gap-3">
        <ChartLineUp weight="duotone" className="h-full w-auto" />
        <ArrowUpRight weight="bold" className="h-[38%] w-auto self-start opacity-70" />
      </div>
      <div className="flex flex-wrap items-end gap-2">
        {tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>
    </div>
  );
}

// Иконка по центру с мелкими точками-аудиторией вокруг, теги столбиком справа.
export function TargetArt({ className = "", tags }: ArtProps) {
  return (
    <div className={`${className} grid grid-cols-[1fr_auto] items-center gap-3 p-2`}>
      <div className="relative flex h-full items-center justify-center">
        <Target weight="duotone" className="h-[62%] w-auto" />
        <span className="absolute left-[14%] top-[18%] size-2.5 rounded-full bg-current opacity-70" />
        <span className="absolute right-[16%] top-[30%] size-3.5 rounded-full bg-current opacity-45" />
        <span className="absolute bottom-[16%] left-[22%] size-2 rounded-full bg-current opacity-55" />
      </div>
      <div className="flex flex-col items-end gap-2">
        {tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>
    </div>
  );
}
