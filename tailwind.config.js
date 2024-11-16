/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem'
    },
    extend: {
      screens: {
        '2xl': '1400px',
        'galaxy-fold': '321px', // @media (min-width: 321px)
        mobile: '768px', // @media (min-width: 768px)
        tablet: '1024px' // @media (min-width: 1024px)
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        'pr-900': 'var(--pr-900)',
        'pr-800': 'var(--pr-800)',
        'pr-700': 'var(--pr-700)',
        'pr-600': 'var(--pr-600)',
        'pr-500': 'var(--pr-500)',
        'pr-400': 'var(--pr-400)',
        'pr-300': 'var(--pr-300)',
        'pr-200': 'var(--pr-200)',
        'pr-100': 'var(--pr-100)',
        'pr-50': 'var(--pr-50)',
        'sm-info-700': 'var(--sm-info-700)',
        'sm-info-500': 'var(--sm-info-500)',
        'sm-info-50': 'var(--sm-info-50)',
        'sm-confirm-700': 'var(--sm-confirm-700)',
        'sm-confirm-500': 'var(--sm-confirm-500)',
        'sm-confirm-50': 'var(--sm-confirm-50)',
        'sm-error-700': 'var(--sm-error-700)',
        'sm-error-500': 'var(--sm-error-500)',
        'sm-error-50': 'var(--sm-error-50)',
        'sm-warining-700': 'var(--sm-warining-700)',
        'sm-warining-500': 'var(--sm-warining-500)',
        'sm-warining-50': 'var(--sm-warining-50)',
        'gr-black': 'var(--gr-black)',
        'gr-900': 'var(--gr-900)',
        'gr-800': 'var(--gr-800)',
        'gr-700': 'var(--gr-700)',
        'gr-600': 'var(--gr-600)',
        'gr-500': 'var(--gr-500)',
        'gr-400': 'var(--gr-400)',
        'gr-300': 'var(--gr-300)',
        'gr-200': 'var(--gr-200)',
        'gr-100': 'var(--gr-100)',
        'gr-50': 'var(--gr-50)',
        'gr-10': 'var(--gr-10)',
        'gr-white': 'var(--gr-white)',
        'gr-transparent-black': 'var(--gr-transparent-black)',
        'gr-transparent-white': 'var(--gr-transparent-white)',
        scrim: 'rgba(0, 0, 0, 0.70)'
      },
      backgroundImage: {
        'gradient-01': 'linear-gradient(180deg, #8CBCFE 0%, #0C6CF1 100%)'
      },
      fontSize: {
        'heading-1': ['24px', { lineHeight: '140%', fontWeight: '700' }],
        'heading-2': ['20px', { lineHeight: '140%', fontWeight: '700' }],
        'heading-3': ['18px', { lineHeight: '120%', fontWeight: '700' }],
        'heading-4': ['16px', { lineHeight: '120%', fontWeight: '700' }],
        'heading-5': ['14px', { lineHeight: '120%', fontWeight: '700' }],
        'heading-6': ['12px', { lineHeight: '120%', fontWeight: '700' }],
        'sub-heading-1': ['14px', { lineHeight: '120%', fontWeight: '500' }],
        'sub-heading-2': ['12px', { lineHeight: '120%', fontWeight: '500' }],
        'body-1': ['18px', { lineHeight: '130%', fontWeight: '400' }],
        'body-2': ['16px', { lineHeight: '130%', fontWeight: '400' }],
        'body-3': ['14px', { lineHeight: '130%', fontWeight: '400' }],
        'body-4': ['12px', { lineHeight: '130%', fontWeight: '400' }],
        'label-1': ['16px', { lineHeight: '150%', fontWeight: '400' }],
        'label-2': ['14px', { lineHeight: '150%', fontWeight: '400' }],
        'btn-1': ['16px', { lineHeight: '200%', fontWeight: '600' }],
        'btn-2': ['14px', { lineHeight: '200%', fontWeight: '600' }],
        'btn-3': ['12px', { lineHeight: '100%', fontWeight: '500' }]
      },
      fontWeight: {
        bold: '700',
        'semi-bold': '600',
        medium: '500',
        regular: '400'
      },
      borderRadius: {
        14: '14px',
        16: '16px'
      },
      borderWidth: {
        12: '1.2px',
        15: '1.5px',
        16: '1.6px'
      },
      boxShadow: {
        modal: '0px 8px 20px 0px rgba(14, 31, 53, 0.20)',
        bottomNav: '0px -2px 8px 0px rgba(165, 165, 165, 0.16)',
        profile: '0px 1px 2px 0px rgba(0, 0, 0, 0.15)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      scrollBarHide: {
        /* Firefox */
        'scrollbar-width': 'none',
        /* Chrome, Safari and Opera */
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }
    }
  },
  variants: {
    extend: {
      scrollBarHide: ['hover', 'focus']
    }
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Firefox */
          'scrollbar-width': 'none',
          /* Chrome, Safari and Opera */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      });
    }
  ]
};
