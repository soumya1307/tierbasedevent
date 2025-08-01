import { Raleway } from 'next/font/google';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

type Props = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  event_date: string;
  tier: 'Free' | 'Silver' | 'Gold' | 'Platinum';
};

export default function EventCard({ id, title, description, image_url, tier, event_date }: Props) {

  const tierColors: Record<(typeof tier)[number], string> = {
    Free: 'bg-green-500 text-white hover:bg-green-400',
    Silver: 'bg-zinc-500 text-white hover:bg-zinc-400',
    Gold: 'bg-yellow-500 text-white hover:bg-yellow-400',
    Platinum: 'bg-purple-500 text-white hover:bg-purple-400'
  };

  return (
    <div className={`${raleway.className} bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden`}>
      <img src={image_url} alt={title} className="w-full h-40 object-cover" />
      <div key={id} className={`p-4 ${tierColors[tier]}`}>
        <h2 className="text-lg font-bold mb-1">{title}</h2>
        <p className="text-sm mb-2">{description}</p>
        <p className="text-xs">{new Date(event_date).toLocaleDateString('en-GB')}</p>
        <p className="text-xs mt-2 font-medium">Tier: {tier}</p>
      </div>
    </div>
  );
}