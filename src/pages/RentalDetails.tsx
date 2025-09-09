import { useEffect, useMemo, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import listBg from '../assets/rentals-bg.png';
import placeholderImg from '../assets/rental-placeholder.png';
import { rentals } from '../data/rentals';
import { getImageForRental } from '../lib/imageProvider';
import AppLayout from '../components/AppLayout';

export default function RentalDetails() {
  const { id } = useParams<{ id: string }>();

  const rental = useMemo(() => rentals.find((r) => r.id === id), [id]);

  if (!rental) {
    return <Navigate to='/rentals' replace />;
  }

  const [mainUrl, setMainUrl] = useState<string | null>(null);
  const [gallery, setGallery] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      try {
        const main = await getImageForRental(
          rental.id + ':main',
          rental.name,
          rental.location.city
        );

        const queries = [
          `${rental.name} interior`,
          `${rental.name} living room`,
          `${rental.name} bedroom`,
          `${rental.name} bathroom`,
        ];

        const results = await Promise.all(
          queries.map((q, idx) =>
            getImageForRental(
              `${rental.id}:g${idx + 1}`,
              q,
              rental.location.city
            )
          )
        );

        if (mounted) {
          setMainUrl(main ?? null);
          setGallery(results.map((u: any) => u ?? null));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [rental.id, rental.name, rental.location.city]);

  return (
    <AppLayout bgImage={listBg} overlay={0.35}>
      <div className='mx-auto w-[95%] max-w-6xl'>
        <section className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <div className='relative h-64 w-full overflow-hidden rounded-3xl sm:h-80 md:h-96 bg-slate-200'>
              {loading ? (
                <Skeleton />
              ) : (
                <img
                  src={mainUrl ?? placeholderImg}
                  alt={rental.name}
                  className='h-full w-full object-cover'
                  loading='eager'
                />
              )}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            {gallery.map((url, i) => (
              <div
                key={i}
                className='relative h-28 w-full overflow-hidden rounded-2xl sm:h-32 md:h-36 bg-slate-200'
              >
                {loading ? (
                  <Skeleton />
                ) : (
                  <img
                    src={url ?? placeholderImg}
                    alt={`${rental.name} photo ${i + 1}`}
                    className='h-full w-full object-cover'
                    loading='lazy'
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        <section className='mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <div className='text-slate-700 font-semibold'>
              € {rental.price}
              <span className='text-xs font-normal text-slate-500'>
                {' '}
                /mesečno
              </span>
            </div>

            <h1 className='mt-2 text-2xl sm:text-3xl font-semibold text-slate-900'>
              {rental.name}
            </h1>
            <p className='mt-1 text-sm text-slate-500'>
              {rental.location.address}
            </p>

            <button className='mt-5 inline-flex rounded-xl bg-[color:var(--secondary)] px-5 py-2.5 text-white hover:bg-[color:var(--primary)]'>
              Rezerviši
            </button>
          </div>

          <aside className='rounded-3xl bg-white/75 p-5 shadow-xl backdrop-blur'>
            <h2 className='text-lg font-semibold text-slate-800'>Opis</h2>
            <p className='mt-2 text-sm leading-6 text-slate-700'>
              {rental.description}
            </p>
          </aside>
        </section>
      </div>
    </AppLayout>
  );
}

function Skeleton() {
  return <div className='h-full w-full animate-pulse bg-slate-200/70' />;
}