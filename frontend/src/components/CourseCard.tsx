export type CapabilityCardItem = {
  title: string;
  summary: string;
  tags: string[];
};

type CapabilityCardProps = {
  item: CapabilityCardItem;
};

export default function CapabilityCard({ item }: CapabilityCardProps) {
  return (
    <article className="glass-panel p-5">
      <h3 className="text-lg font-semibold text-moonInk">{item.title}</h3>
      <p className="mt-2 text-sm text-moonMuted">{item.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-moonBorder/70 px-2 py-1 text-[11px] text-moonInk/70">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
