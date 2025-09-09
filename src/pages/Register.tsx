import { type FormEvent } from 'react';
import { Link } from 'react-router-dom';

import sideImageUrl from '../assets/register-side.png';

export default function Register() {
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: handle sign up
  }

  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white text-slate-900'>
      <div className='relative hidden lg:block'>
        <img
          src={sideImageUrl}
          alt='Luksuzni apartmani u prirodi'
          className='absolute inset-0 h-full w-full object-cover'
          loading='eager'
        />
        <div className='absolute inset-0 bg-black/10' />
      </div>

      <div className='flex items-center justify-center px-6 py-10 sm:px-10'>
        <div className='w-full max-w-md'>
          <h1 className='text-3xl sm:text-4xl font-semibold leading-tight text-center'>
            Dobrodošli <span className='text-[color:var(--secondary)]'>na</span>{' '}
            <span className='text-[color:var(--accent)] font-bold'>
              Rentivu!
            </span>
          </h1>

          <p className='mt-6 text-sm text-slate-500 text-center'>
            Registrujte se
          </p>

          <form onSubmit={onSubmit} className='mt-4 space-y-4'>
            <div>
              <label
                htmlFor='name'
                className='mb-1 block text-sm font-medium text-slate-700'
              >
                Ime i prezime
              </label>
              <input
                id='name'
                name='name'
                type='text'
                required
                className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className='mb-1 block text-sm font-medium text-slate-700'
              >
                Vaš email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                required
                className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='mb-1 block text-sm font-medium text-slate-700'
              >
                Lozinka
              </label>
              <input
                id='password'
                name='password'
                type='password'
                required
                className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
              />
            </div>

            <div>
              <label
                htmlFor='confirm'
                className='mb-1 block text-sm font-medium text-slate-700'
              >
                Potvrda lozinke
              </label>
              <input
                id='confirm'
                name='confirm'
                type='password'
                required
                className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
              />
            </div>

            <div>
              <label
                htmlFor='phone'
                className='mb-1 block text-sm font-medium text-slate-700'
              >
                Kontakt
              </label>
              <input
                id='phone'
                name='phone'
                type='tel'
                className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
              />
            </div>

            <button
              type='submit'
              className='cursor-pointer w-full rounded-lg bg-[color:var(--secondary)] px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-[color:var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--highlight)]'
            >
              Sign up
            </button>
          </form>

          <p className='mt-8 text-center text-xs text-slate-500'>
            Već imate nalog?{' '}
            <Link
              to={'/login'}
              className='text-[color:var(--accent)] hover:underline'
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}