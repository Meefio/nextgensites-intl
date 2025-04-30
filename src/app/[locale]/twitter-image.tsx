import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'NextGen Sites - Professional web development with Next.js'
export const size = {
  width: 1200,
  height: 675,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(to right, #020817, #1e293b)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 60,
          color: 'white',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ fontSize: 36, opacity: 0.8, marginBottom: 20 }}>
          {locale === 'pl' ? '👋 Poznaj' : '👋 Meet'}
        </div>

        <div
          style={{
            fontSize: 82,
            fontWeight: 'bold',
            marginBottom: 30,
            background: 'linear-gradient(to right, #fff, #a1a1aa)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          NextGen Sites
        </div>

        <div style={{ fontSize: 40, opacity: 0.9, marginBottom: 40, maxWidth: '90%' }}>
          {locale === 'pl'
            ? 'Nowoczesne strony internetowe z Next.js o doskonałym SEO'
            : 'Modern Next.js websites with excellent SEO'}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 40,
            gap: 20,
          }}
        >
          <div
            style={{
              padding: '10px 20px',
              borderRadius: 100,
              background: 'rgba(255, 255, 255, 0.1)',
              fontSize: 24,
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            nextgensites.pl
          </div>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: 100,
              background: '#0284c7',
              fontSize: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M13.8 10.5L20.7 2h-3.1l-5.3 6.5L7.7 2H1l7.8 11.5L1 22h3.1l5.7-7 5.1 7H22l-8.2-11.5zm-2.4 3.5l-1-1.4L4.2 4h2.3l4.9 7.2 1 1.4 6.8 10h-2.3l-5.4-7.6h-.1z" />
            </svg>
            @nextgensites
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 
