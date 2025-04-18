import { ImageResponse } from 'next/og'
import { getTranslations } from 'next-intl/server'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'NextGen Sites - Professional web development with Next.js'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({ params }: { params: { locale: string } }) {
  // Get the proper translations for the OG image
  const t = await getTranslations({ locale: params.locale, namespace: 'Metadata' })

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(to bottom, #020817, #1e293b)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
          color: 'white',
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            style={{ marginRight: 20 }}
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ fontSize: 72, fontWeight: 'bold' }}>
            {t('siteTitle')}
          </div>
        </div>

        <div style={{ fontSize: 36, opacity: 0.9, marginBottom: 20 }}>
          {params.locale === 'pl'
            ? 'Nowoczesne strony internetowe z Next.js'
            : 'Modern websites with Next.js'}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 40,
            gap: 30,
          }}
        >
          <div
            style={{
              padding: '12px 24px',
              borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.1)',
              fontSize: 24,
            }}
          >
            {t('featureSeo')}
          </div>
          <div
            style={{
              padding: '12px 24px',
              borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.1)',
              fontSize: 24,
            }}
          >
            {t('featureSpeed')}
          </div>
          <div
            style={{
              padding: '12px 24px',
              borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.1)',
              fontSize: 24,
            }}
          >
            {t('featureResponsive')}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 
