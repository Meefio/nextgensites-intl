import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();

  return (
    <footer className="container max-w-6xl mt-10 flex flex-wrap justify-between pb-16 pt-10 ">
      <div className="flex basis-full flex-col gap-6 md:basis-auto">
        <Link href="/" className="flex items-center gap-3">
          <svg fill="none" viewBox="0 0 238 238" className="size-6 text-primary" role="img"
            aria-labelledby="footer-logo-title">
            <title id="footer-logo-title">Logo NextGen Sites</title>
            <path
              d="M236.738 121.995C236.743 125.448 236.415 128.865 235.749 132.25C235.077 135.635 234.082 138.922 232.764 142.109C231.441 145.297 229.822 148.328 227.9 151.193C225.978 154.063 223.796 156.708 221.348 159.146L162.816 217.651C161.816 216.88 160.874 216.052 159.978 215.161C159.249 214.432 158.556 213.667 157.905 212.87C157.254 212.073 156.639 211.245 156.066 210.385C155.493 209.531 154.967 208.646 154.478 207.74C153.993 206.828 153.556 205.896 153.16 204.943C152.764 203.995 152.421 203.021 152.124 202.036C151.822 201.052 151.572 200.052 151.374 199.042C151.171 198.031 151.02 197.01 150.921 195.984C150.816 194.958 150.77 193.932 150.77 192.901C150.77 191.87 150.816 190.844 150.921 189.818C151.02 188.792 151.171 187.771 151.374 186.76C151.572 185.75 151.822 184.75 152.124 183.766C152.421 182.776 152.764 181.807 153.16 180.854C153.556 179.906 153.993 178.974 154.478 178.063C154.967 177.156 155.493 176.271 156.066 175.417C156.639 174.557 157.254 173.729 157.905 172.932C158.556 172.135 159.249 171.37 159.978 170.641L211.41 119.203L159.988 67.7656C159.27 67.0417 158.582 66.2865 157.931 65.4948C157.285 64.7031 156.676 63.8854 156.103 63.0313C155.535 62.1823 155.009 61.3073 154.525 60.4063C154.04 59.5052 153.603 58.5833 153.212 57.6406C152.816 56.6979 152.467 55.7396 152.171 54.7604C151.868 53.7813 151.613 52.7917 151.41 51.7917C151.207 50.7865 151.051 49.7813 150.947 48.7604C150.842 47.7448 150.785 46.724 150.78 45.7031C150.775 44.6771 150.816 43.6615 150.91 42.6406C151.004 41.625 151.145 40.6094 151.337 39.6094C151.53 38.6042 151.77 37.6094 152.056 36.6302C152.348 35.6458 152.681 34.6823 153.066 33.7344C153.447 32.7865 153.874 31.8594 154.348 30.9531C154.822 30.0469 155.337 29.1615 155.895 28.3073C156.452 27.4479 157.051 26.625 157.691 25.8229C158.332 25.026 159.004 24.2604 159.717 23.5312C160.712 24.3125 161.655 25.151 162.546 26.0469L221.348 84.849C223.796 87.2813 225.983 89.9323 227.905 92.7969C229.827 95.6667 231.447 98.6927 232.764 101.88C234.087 105.068 235.082 108.354 235.749 111.74C236.421 115.125 236.749 118.542 236.738 121.995Z"
              fill="currentColor"
            />
            <path
              d="M2.13501 116.621C2.12459 113.173 2.45271 109.751 3.12459 106.366C3.79126 102.98 4.78605 99.694 6.10896 96.5065C7.42667 93.319 9.05167 90.293 10.9683 87.4232C12.8902 84.5586 15.0777 81.9076 17.5204 79.4753L76.0517 20.9648C77.0517 21.7357 77.9996 22.569 78.8954 23.4596C79.6194 24.1888 80.3121 24.9492 80.9683 25.7461C81.6194 26.543 82.234 27.3711 82.8017 28.2305C83.3746 29.0846 83.9058 29.9701 84.3902 30.8815C84.8746 31.7878 85.3173 32.7201 85.7079 33.6732C86.1038 34.6263 86.4527 35.5951 86.7496 36.5794C87.0465 37.569 87.2965 38.5638 87.4996 39.5742C87.6975 40.5898 87.8486 41.6055 87.9527 42.6315C88.0517 43.6576 88.1038 44.6836 88.1038 45.7148C88.1038 46.7461 88.0517 47.7773 87.9527 48.8034C87.8486 49.8242 87.6975 50.8451 87.4996 51.8555C87.2965 52.8659 87.0465 53.8659 86.7496 54.8503C86.4527 55.8398 86.1038 56.8086 85.7079 57.7617C85.3173 58.7148 84.8746 59.6419 84.3902 60.5534C83.9058 61.4596 83.3746 62.3451 82.8017 63.2044C82.234 64.0586 81.6194 64.8867 80.9683 65.6836C80.3121 66.4805 79.6194 67.2461 78.8954 67.9753L27.4631 119.418L78.8798 170.855C79.6038 171.574 80.2913 172.335 80.9371 173.121C81.5881 173.913 82.1975 174.736 82.7652 175.585C83.3329 176.434 83.859 177.309 84.3433 178.21C84.8277 179.111 85.2652 180.033 85.661 180.975C86.0569 181.918 86.4006 182.882 86.7027 183.855C87.0048 184.835 87.2548 185.824 87.4579 186.829C87.661 187.829 87.8173 188.84 87.9215 189.855C88.0308 190.871 88.0829 191.892 88.0933 192.913C88.0986 193.939 88.0517 194.96 87.9579 195.975C87.8694 196.996 87.7236 198.007 87.5308 199.012C87.3433 200.017 87.1038 201.007 86.8121 201.991C86.5256 202.97 86.1871 203.934 85.8069 204.882C85.4267 205.829 84.9944 206.757 84.5256 207.668C84.0517 208.574 83.536 209.454 82.9788 210.309C82.4163 211.168 81.8173 211.996 81.1819 212.793C80.5413 213.59 79.8642 214.355 79.1506 215.09C78.1558 214.309 77.2131 213.47 76.3225 212.574L17.5204 153.767C15.0725 151.335 12.8902 148.684 10.9683 145.819C9.04646 142.954 7.42667 139.923 6.10376 136.736C4.78084 133.548 3.78605 130.262 3.11938 126.876C2.45271 123.491 2.12459 120.074 2.13501 116.621Z"
              fill="currentColor"
            />
          </svg>
          <span className="font-heading text-xl font-bold">NextGen Sites</span>
        </Link>
        <div className="flex flex-col gap-4">
          <a href="tel:+48694671786" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <Phone className="size-5 text-primary" />
            <span className="text-sm">+48 694 671 786</span>
          </a>
          <a href="mailto:kontakt@nextgensites.pl" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <Mail className="size-5 text-primary" />
            <span className="text-sm">kontakt@nextgensites.pl</span>
          </a>
          <Link
            href="https://maps.app.goo.gl/CVRyxk8aFXC7oTTs9"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Maps - NextGen Sites location"
          >
            <svg className="size-5 text-primary" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" fill="currentColor" />
            </svg>
            <span className="text-sm">Google Maps</span>
          </Link>
        </div>
      </div>

      <div className="mt-10 flex basis-1/2 flex-col gap-5 md:mt-0 md:basis-auto">
        <h3 className="font-semibold">{t('navigation')}</h3>
        <Link href="/#benefits" className="text-sm text-muted-foreground hover:text-foreground">
          {t('benefits')}
        </Link>
        <Link href="/#portfolio" className="text-sm text-muted-foreground hover:text-foreground">
          Portfolio
        </Link>
        <Link href="/baza-wiedzy" className="text-sm text-muted-foreground hover:text-foreground">
          {locale === 'pl' ? 'Baza Wiedzy' : 'Knowledge Base'}
        </Link>
        <Link href="/#proces" className="text-sm text-muted-foreground hover:text-foreground">
          {t('process')}
        </Link>
        <Link href="/framer-templates" className="text-sm text-muted-foreground hover:text-foreground">
          {t('framerTemplates')}
        </Link>
        <Link href="/#contact" className="text-sm text-muted-foreground hover:text-foreground">
          {t('contact')}
        </Link>
      </div>

      <div className="mt-10 flex basis-1/2 flex-col gap-5 md:mt-0 md:basis-auto">
        <h3 className="font-semibold">{t('services')}</h3>
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          {t('websites')}
        </Link>
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          {t('onlineStores')}
        </Link>
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          {t('cms')}
        </Link>
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          {t('seo')}
        </Link>
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          {t('support')}
        </Link>
      </div>

      <div className="mt-10 flex basis-1/2 flex-col gap-5 md:mt-0 md:basis-auto">
        <h3 className="font-semibold">{t('documents')}</h3>
        <Link href="/polityka-prywatnosci" className="text-sm text-muted-foreground hover:text-foreground">
          {t('privacy')}
        </Link>
        <Link href="/regulamin" className="text-sm text-muted-foreground hover:text-foreground">
          {t('terms')}
        </Link>
        <Link href="/rodo" className="text-sm text-muted-foreground hover:text-foreground">
          {t('gdpr')}
        </Link>
      </div>

      <div className="mt-10 flex basis-full flex-col gap-2 border-t pt-10 text-center text-sm text-muted-foreground md:mt-20">
        <p>{t('copyright', { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
