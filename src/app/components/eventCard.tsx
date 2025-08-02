type Props = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  event_date: string;
  tier: 'Free' | 'Silver' | 'Gold' | 'Platinum';
  accessible: boolean;
};

export default function EventCard({ id, title, description, image_url, tier, event_date, accessible }: Props) {
  const tierColors: Record<typeof tier, string> = {
    Free: 'bg-green-500 text-white',
    Silver: 'bg-zinc-500 text-white',
    Gold: 'bg-yellow-500 text-white',
    Platinum: 'bg-purple-500 text-white'
  };

  return (
    // Maintaining the events info and blocking access to non-tier events
    <div className="relative rounded-xl overflow-hidden shadow transition hover:shadow-lg">
      {!accessible && (
        <div className="absolute top-0 left-0 w-full bg-black/70 text-white text-sm font-semibold text-center py-2 z-20">
          Upgrade to {tier} to access this event
        </div>
      )}
      <div className={accessible ? '' : 'blur-sm opacity-40 pointer-events-none select-none'}>
        <img src={image_url} alt={title} className="w-full h-40 object-cover" />
        <div key={id} className={`p-4 ${tierColors[tier]}`}>
          <h2 className="text-lg font-bold mb-1">{title}</h2>
          <p className="text-sm mb-2">{description}</p>
          <p className="text-xs">{new Date(event_date).toLocaleDateString('en-GB')}</p>
          <p className="text-xs mt-2 font-medium">Tier: {tier}</p>
        </div>
      </div>
    </div>
  );
}