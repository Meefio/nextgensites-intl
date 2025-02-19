import { Hero } from '@/app/components/portfolio/Hero'
import { AboutSection } from '@/app/components/portfolio/AboutSection'
import { PhotoSection } from '@/app/components/portfolio/PhotoSection'
import { ContactForm } from '@/app/components/contact-form'
import { Footer } from '@/app/components/footer'

export default function UnderPressureProject() {
  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <AboutSection />
        <PhotoSection />
        <ContactForm />
        <Footer />
      </div>
    </>
  )
} 
