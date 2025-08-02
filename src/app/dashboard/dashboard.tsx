'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { canAccess, tierLevels } from "../utils/tierAccess";
import EventCard from "../components/eventCard";
import { Merriweather_Sans, Raleway } from 'next/font/google';

const merri = Merriweather_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700']
});

type Event = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tier: 'Free' | 'Silver' | 'Gold' | 'Platinum';
  event_date: string;
  accessible: boolean;
};

const tiers = ['Free', 'Silver', 'Gold', 'Platinum'] as const;

const tierColors: Record<typeof tiers[number], string> = {
  Free: 'bg-green-500 border-green-500 hover:bg-green-400',
  Silver: 'bg-zinc-500 border-zinc-500 hover:bg-zinc-400',
  Gold: 'bg-yellow-500 border-yellow-500 hover:bg-yellow-400',
  Platinum: 'bg-purple-500 border-purple-500 hover:bg-purple-400',
};

const tierBorderColors: Record<typeof tiers[number], string> = {
  Free: 'border-green-500',
  Silver: 'border-zinc-500',
  Gold: 'border-yellow-500',
  Platinum: 'border-purple-500',
};

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [refreshToggle] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (error) {
        console.error("Supabase fetch error:", error.message);
        return;
      }

      const userTier = (user?.publicMetadata?.tier as string) || 'Free';
      const allEvents = data.map(event => ({
        ...event, accessible:
        userTier in tierLevels && event.tier in tierLevels
          ? canAccess(userTier as keyof typeof tierLevels, event.tier as keyof typeof tierLevels)
          : false
    }));
      setEvents(allEvents);
    };

    if (isLoaded && user) fetchEvents();
  }, [user, isLoaded, refreshToggle]);

  const handleTierChange = async (tier: string) => {
    try {
      const res = await fetch('/api/updateTier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');

      console.log(`Tier updated to ${tier}`);
      window.location.reload();
    } catch (err) {
      console.error("Error changing tier:", err);
    }
  };

  if (!isLoaded) return <div className={`${merri.className} p-6 text-center text-3xl`}>Loading...</div>;
  if (!user) return <div className={`${merri.className} p-6 text-center text-2xl`}>Sorry, You must be signed in to view the events</div>;

  const currentTier = (user?.publicMetadata?.tier as string) || 'Free';

  const groupedEvents = tiers.map(tier => ({
    tier,
    events: events.filter(event => event.tier === tier),
  }));

  return (
    <div className="p-4 sm:p-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className={`${merri.className} text-2xl font-semibold`}>
          Welcome to your events
        </h1>
        <div className={`${merri.className} text-xl sm:text-2xl`}>
          Your Tier is{' '}
          <span className={`${raleway.className} px-3 py-1 rounded-full text-white ${tierColors[currentTier as keyof typeof tierColors]}`}>
            {currentTier}
          </span>
        </div>
      </div>

      <div className={`${raleway.className} flex flex-wrap gap-2`}>
        {tiers.map(tier => {
          const isActive = tier === currentTier;
          return (
            <button
              key={tier}
              onClick={() => !isActive && handleTierChange(tier)}
              disabled={isActive}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${tierColors[tier]}
              ${isActive ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isActive ? `Current: ${tier}` : `Set ${tier}`}
            </button>
          );
        })}
      </div>

      {groupedEvents.map(({ tier, events }) =>
        events.length > 0 ? (
          <section key={tier}>
            <h2 className={`${merri.className} text-xl font-bold mb-4`}>
              {tier} Tier Events
            </h2>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 pl-4 border-l-4 ${tierBorderColors[tier]}`}>
              {events.map(event => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}