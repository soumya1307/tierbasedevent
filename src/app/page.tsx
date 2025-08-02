import { Merriweather_Sans, Raleway } from 'next/font/google';

const merri = Merriweather_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700']
});

// Landing page with application description
export default function Home() {
  return (
    <section
      className="min-h-screen flex items-center justify-center body-font bg-[url('https://picsum.photos/id/56/1080/1080')] bg-cover bg-center px-4 sm:px-6"
    >
      <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl px-4 py-10 sm:py-16 md:py-20 lg:py-24 bg-white/80 backdrop-blur-md rounded-3xl sm:rounded-full shadow-xl">
        <div className="text-center">
          <h1 className={`${merri.className} text-3xl sm:text-4xl md:text-5xl font-semibold text-teal-700 mb-4`}>
            Eventify
          </h1>
          <p className={`${raleway.className} text-base sm:text-lg md:text-xl text-black leading-relaxed p-5`}>
            Eventify is a dynamic tier-based event platform that curates and showcases
            exclusive events tailored to user membership levels — Free, Silver, Gold, and
            Platinum. Whether you&apos;re looking for open-access webinars or high-tier
            invite-only experiences, Eventify personalizes your dashboard to match your
            tier. With seamless authentication, real-time access control, and a responsive,
            modern UI, Eventify makes discovering and managing events effortless and engaging.
          </p>
        </div>
      </div>
    </section>
  );
}
