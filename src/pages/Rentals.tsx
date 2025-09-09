import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import bgImage from '../assets/rentals-bg.png';
import placeholderImg from '../assets/rental-placeholder.png';
import { rentals } from '../data/rentals';
import { getImageForRental } from '../lib/imageProvider';
import AppLayout from '../components/AppLayout';
import RentalCard from '../components/rentals/RentalCard';

type ImagesMap = Record<string, string | null>;

export default function Rentals() {
  const [images, setImages] = useState<ImagesMap>({});
  const [searchParams] = useSearchParams();

  const q = searchParams.get('q')?.toLowerCase() ?? '';
  const type = searchParams.get('type') ?? '';
  const priceMax = searchParams.get('priceMax');
  const location = searchParams.get('location') ?? '';

  const filteredRentals = useMemo(() => {
    return rentals.filter((r) => {
      if (
        q &&
        !(
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.location.city.toLowerCase().includes(q) ||
          r.location.address.toLowerCase().includes(q)
        )
      ) {
        return false;
      }

      if (type && r.type !== type) return false;

      if (priceMax && r.price > Number(priceMax)) return false;

      if (location && r.location.city !== location) return false;

      return true;
    });
  }, [q, type, priceMax, location]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const entries = await Promise.all(
        filteredRentals.map(async (r) => {
          const url = await getImageForRental(r.id, r.name, r.location.city);
          return [r.id, url] as const;
        })
      );
      if (mounted) {
        const map: ImagesMap = {};
        for (const [id, url] of entries) map[id] = url;
        setImages(map);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [filteredRentals]);

  return (
    <AppLayout bgImage={bgImage} overlay={0.35}>
      <div className='mx-auto w-[95%] max-w-6xl'>
        <header className='mb-6'>
          <h1 className='text-2xl sm:text-3xl font-semibold text-slate-900'>
            Nekretnine
          </h1>
          <p className='text-sm text-slate-600 mt-1'>
            Pregled svih dostupnih nekretnina.
          </p>
        </header>

        {filteredRentals.length === 0 ? (
          <p className='text-sm text-slate-600'>
            Nema rezultata za zadate filtere.
          </p>
        ) : (
          <section className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {filteredRentals.map((r) => (
              <RentalCard
                key={r.id}
                rental={r}
                imageUrl={images[r.id] ?? null}
                placeholder={placeholderImg}
              />
            ))}
          </section>
        )}
      </div>
    </AppLayout>
  );
}