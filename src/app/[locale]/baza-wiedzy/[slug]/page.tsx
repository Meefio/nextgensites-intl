import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Calendar, Clock, Tag, CheckCircle2 } from 'lucide-react';
import { Breadcrumb } from '@/app/components/breadcrumb';

interface BlogArticle {
  title: string;
  description: string;
  publishDate: string;
  category: string;
  readingTime: string;
  content: string;
}

interface TableOfContentsItem {
  id: string;
  title: string;
}

export async function generateStaticParams({ params }: { params: Promise<{ locale: string }> }) {
  // For now we only have one article
  const { locale } = await params;
  return [
    { slug: locale === 'pl' ? 'jak-wybrac-dobra-strone-internetowa-dla-swojej-firmy' : 'how-to-choose-the-right-website-for-your-business' }
  ];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params;
  const blogArticle = await getTranslations({ locale, namespace: 'BlogArticle.howToChooseWebsite' });

  return {
    title: blogArticle('title'),
    description: blogArticle('description'),
  };
}

export default async function KnowledgeBaseArticlePage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'KnowledgeBase' });
  const blogArticle = await getTranslations({ locale, namespace: 'BlogArticle.howToChooseWebsite' });

  // Define table of contents sections (would be different for each article in a real app)
  const tableOfContents: TableOfContentsItem[] = [
    { id: 'intro', title: locale === 'pl' ? 'Wprowadzenie' : 'Introduction' },
    { id: 'step1', title: locale === 'pl' ? 'Krok 1: Wyszukiwanie w Google' : 'Step 1: Google Search' },
    { id: 'step2', title: locale === 'pl' ? 'Krok 2: Technologie stron' : 'Step 2: Website Technologies' },
    { id: 'step3', title: locale === 'pl' ? 'Krok 3: Twoje potrzeby' : 'Step 3: Your Needs' },
    { id: 'automation', title: locale === 'pl' ? 'Automatyzacja' : 'Automation' },
    { id: 'conclusion', title: locale === 'pl' ? 'Podsumowanie' : 'Conclusion' },
  ];

  // In a real app, you'd fetch the article based on the slug
  // For now we'll just use our one article regardless of slug
  const article: BlogArticle = {
    title: blogArticle('title'),
    description: blogArticle('description'),
    publishDate: blogArticle('publishDate'),
    category: blogArticle('category'),
    readingTime: blogArticle('readingTime'),
    content: locale === 'pl' ? `
      <section id="intro">
      <h2>Pozwól, że podzielę się z Tobą wizją — tak, jakbym sam nie znał się na stronach internetowych.</h2>
      
      <p>Jesteś właścicielem firmy. Chcesz rozwijać biznes. Szukasz nowych klientów, większych zysków. I wiesz, że w 2025 roku bez strony internetowej to jakby Cię nie było.</p>
      
      <p>Ale… nie chcesz byle jakiej strony.<br>
      Bo po co Ci strona, która nie generuje ruchu i nie przyciąga klientów?<br>
      Żyjemy w czasach AI, szybkich decyzji i przebiegłej konkurencji. Potrzebujesz czegoś, co działa.</p>
      
      <h3>Zacznijmy więc od początku.</h3>
      <p>Jak wyglądałby Twój proces myślenia, gdybyś pierwszy raz szukał strony dla firmy?<br>
      Pokażę Ci to krok po kroku — żebyś zaoszczędził czas i nie wpadł w te same pułapki co większość.</p>
      </section>
      
      <section id="step1">
      <h3>🔍 Krok 1: Wpisujesz coś w Google</h3>
      <p>"Jaka strona dla firmy transportowej / kosmetycznej / usługowej?"</p>
      
      <p><strong>Efekt?</strong><br>
      ➡️ 1000 wyników. Większość to artykuły SEO, pisane na szybko.<br>
      "Twoja strona musi być nowoczesna, responsywna i bezpieczna."<br>
      Tylko że... sama ta strona wygląda jak z 2011 roku.</p>
      
      <div class="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg my-6">
        <h4 class="text-lg font-semibold text-blue-700 dark:text-blue-300">💡 A SEO? Co to w ogóle jest?</h4>
        <p class="text-blue-700 dark:text-blue-300">SEO (czyli pozycjonowanie) to sposób, dzięki któremu Twoja strona może pojawić się wyżej w wynikach Google. Jeśli Twoi klienci wpisują "księgowość Warszawa", a Twojej strony nie widać — to właśnie znaczy, że SEO nie działa.</p>
      </div>
      </section>
      
      <section id="step2">
      <h3>⚙️ Krok 2: W jakiej technologii warto zamówić stronę?</h3>
      <p>Szukasz dalej: "WordPress vs Wix vs Webflow vs Next.js vs coś-tam-jeszcze".</p>
      
      <p><strong>Znów zalew:</strong><br>
      ➡️ Każda strona mówi, że ich rozwiązanie jest najlepsze, a inne są "meh".<br>
      Tylko że znowu:</p>
      
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>Strona ładuje się 10 sekund.</li>
        <li>Wszystko wygląda topornie, jakby robione bez pomysłu.</li>
        <li>Zero konkretów, zero przykładów.</li>
      </ul>
      
      <p>A Ty masz przecież realne pytania:</p>
      
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>Czy Wix to tylko drag-and-drop? Czy to wystarczy?</li>
        <li>Czy WordPress to coś, co sam obsłużę, czy będę co tydzień komuś płacił?</li>
        <li>Co znaczy, że "Next.js ma świetne SEO"? Czy to faktycznie mi coś da?</li>
        <li>Czy Webflow nie będzie za trudny?</li>
        <li>A może mi się po prostu nie chce tego wszystkiego ogarniać?</li>
      </ul>
      </section>
      
      <section id="step3">
      <h3>🧠 Krok 3: No dobra, ale czego JA w ogóle potrzebuję?</h3>
      <p>Zaczynasz myśleć bardziej praktycznie:</p>
      
      <h4>👉 Po co mi ta strona?</h4>
      <ul class="list-disc pl-6 my-4 space-y-1">
        <li>Żeby wyglądać profesjonalnie?</li>
        <li>Żeby ktoś mógł mnie znaleźć i zadzwonić?</li>
        <li>Żeby ludzie kupowali rzeczy online?</li>
        <li>Żeby zbierać kontakty do newslettera?</li>
      </ul>
      
      <h4>👉 Czy mam czas, żeby robić ją sam?</h4>
      <p>Z jednej strony — no jasne, można usiąść wieczorem i poklikać coś w kreatorze.<br>
      Z drugiej — jeśli nowy klient przynosi Ci 500, 1000, 5000 czy nawet 25 000 zł,<br>
      to czy warto oszczędzać na stronie, która mogłaby go przyciągnąć?</p>
      
      <p>To nie jest koszt. To inwestycja, która może się zwrócić szybciej, niż myślisz.</p>
      
      <h4>👉 Czy planuję rozwój strony?</h4>
      <p>Bo może dziś chcesz tylko prostą wizytówkę, ale za 3 miesiące:</p>
      
      <ul class="list-disc pl-6 my-4 space-y-1">
        <li>sklep online,</li>
        <li>blog z poradami,</li>
        <li>podcast,</li>
        <li>czat z AI na stronie,</li>
        <li>formularz kontaktowy z CRM-em,</li>
        <li>automatyczne wystawianie faktur...</li>
      </ul>
      
      <div class="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg my-6">
        <h4 class="text-lg font-semibold text-amber-700 dark:text-amber-300">⚠️ I tutaj robi się ciekawie…</h4>
        <p class="text-amber-700 dark:text-amber-300">Bo może: nie szukasz tylko "strony", ale systemu do zarządzania całą firmą?</p>
      </div>
      
      <p>Może potrzebujesz:</p>
      
      <ul class="list-disc pl-6 my-4 space-y-1">
        <li>Panelu klienta z zamówieniami i statusami</li>
        <li>Newslettera z segmentacją odbiorców</li>
        <li>Dashboardu ze statystykami i analizami zachowań klientów</li>
        <li>Powiadomień SMS i e-mail z automatycznymi przypomnieniami</li>
        <li>Skanera dokumentów z analizą AI (np. umów, FV)</li>
        <li>Podpisu elektronicznego dla klientów</li>
        <li>Integracji z WhatsAppem, Slackiem, bazami danych, kalendarzem Google</li>
      </ul>
      </section>
      
      <section id="automation">
      <h3>🧩 I najważniejsze — automatyzacja.</h3>
      <p>Można dziś zautomatyzować niemal wszystko:<br>
      od prostych przypomnień, przez procesy zamówień, aż po obsługę klienta.<br>
      Niektóre procesy, które dziś zajmują Ci godzinę dziennie — można zastąpić kodem.<br>
      A to znaczy: więcej czasu dla Ciebie albo mniej etatów do opłacania.</p>
      </section>
      
      <section id="conclusion">
      <h3>✅ Więc co powinieneś zrobić?</h3>
      <p>Zanim zaczniesz szukać wykonawcy, odpowiedz sobie na kilka prostych pytań:</p>
      
      <ol class="list-decimal pl-6 my-4 space-y-2">
        <li><strong>Jaki mam cel?</strong><br>
        Czy strona ma tylko wyglądać ładnie? Czy ma zarabiać?</li>
        
        <li><strong>Czy chcę ją robić sam, czy wolę oddać to komuś?</strong><br>
        Twoje godziny są cenne. Nie warto tracić ich na rzeczy, które i tak oddasz później specjaliście.</li>
        
        <li><strong>Czy planuję rozwój strony?</strong><br>
        Jeśli tak — lepiej zrobić solidny fundament już teraz, niż burzyć wszystko za rok.</li>
      </ol>
      
      <h3>💬 A co z kosztami?</h3>
      <p>Pewnie i tak już o tym myślisz — "No dobra, ale ile kosztuje strona?"</p>
      
      <p>Odpowiedź brzmi: to zależy.<br>
      Bo tak samo jak nie kupujesz "po prostu samochodu", tylko wybierasz między miejskim autem a vanem do transportu, tak samo jest ze stronami.</p>
      
      <h3>📖 Zajrzyj do kolejnego wpisu:</h3>
      <p><a href="#" class="text-primary hover:underline">👉 Ile kosztuje strona internetowa? Co wpływa na cenę i co faktycznie kupujesz? →</a></p>
      
      <div class="bg-green-50 dark:bg-green-950 p-6 rounded-lg my-8 text-center">
        <h3 class="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">🤝 Potrzebujesz wsparcia w wyborze?</h3>
        <p class="text-green-700 dark:text-green-300 mb-4">Nie musisz wszystkiego robić sam.<br>
        Jeśli chcesz, możemy wspólnie przejść przez ten proces — krok po kroku, bez presji.</p>
        <a href="/#contact" class="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">📩 Skontaktuj się z nami — pomożemy Ci wybrać rozsądnie.</a>
      </div>
      </section>
    ` : `
      <section id="intro">
      <h2>Let me share a vision with you — as if I didn't know much about websites myself.</h2>
      
      <p>You're a business owner. You want to grow your business. You're looking for new customers, higher profits. And you know that in 2025, without a website, it's like you don't exist.</p>
      
      <p>But... you don't want just any website.<br>
      Because what's the point of having a website that doesn't generate traffic or attract customers?<br>
      We live in times of AI, quick decisions, and clever competition. You need something that works.</p>
      
      <h3>So let's start from the beginning.</h3>
      <p>What would your thought process look like if you were looking for a business website for the first time?<br>
      I'll show you step by step — so you can save time and avoid falling into the same traps as most people.</p>
      </section>
      
      <section id="step1">
      <h3>🔍 Step 1: You type something into Google</h3>
      <p>"What kind of website for a transport / cosmetic / service company?"</p>
      
      <p><strong>The result?</strong><br>
      ➡️ 1000 results. Most are quickly written SEO articles.<br>
      "Your website must be modern, responsive, and secure."<br>
      Except... the site itself looks like it's from 2011.</p>
      
      <div class="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg my-6">
        <h4 class="text-lg font-semibold text-blue-700 dark:text-blue-300">💡 And SEO? What is that anyway?</h4>
        <p class="text-blue-700 dark:text-blue-300">SEO (Search Engine Optimization) is how your website can appear higher in Google results. If your customers type "accounting London" and your site isn't visible — that means your SEO isn't working.</p>
      </div>
      </section>
      
      <section id="step2">
      <h3>⚙️ Step 2: What technology should you choose for your website?</h3>
      <p>You search further: "WordPress vs Wix vs Webflow vs Next.js vs something-else".</p>
      
      <p><strong>Again, an overwhelming flood:</strong><br>
      ➡️ Every site says their solution is the best, and others are "meh".<br>
      But again:</p>
      
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>The page takes 10 seconds to load.</li>
        <li>Everything looks clunky, as if made without a plan.</li>
        <li>Zero specifics, zero examples.</li>
      </ul>
      
      <p>And you have real questions:</p>
      
      <ul class="list-disc pl-6 my-4 space-y-2">
        <li>Is Wix just drag-and-drop? Is that enough?</li>
        <li>Is WordPress something I can handle myself, or will I be paying someone weekly?</li>
        <li>What does it mean that "Next.js has great SEO"? Will that actually give me something?</li>
        <li>Will Webflow be too difficult?</li>
        <li>Or maybe I just don't want to deal with all of this?</li>
      </ul>
      </section>
      
      <section id="step3">
      <h3>🧠 Step 3: Okay, but what do I actually need?</h3>
      <p>You start thinking more practically:</p>
      
      <h4>👉 Why do I need this website?</h4>
      <ul class="list-disc pl-6 my-4 space-y-1">
        <li>To look professional?</li>
        <li>So someone can find me and call?</li>
        <li>So people can buy things online?</li>
        <li>To collect contacts for a newsletter?</li>
      </ul>
      
      <h4>👉 Do I have time to build it myself?</h4>
      <p>On one hand — sure, you could sit down in the evening and click around in a website builder.<br>
      On the other hand — if a new client brings you $500, $1,000, $5,000, or even $25,000,<br>
      is it worth saving money on a website that could attract them?</p>
      
      <p>It's not a cost. It's an investment that might pay off faster than you think.</p>
      
      <h4>👉 Am I planning to develop the site further?</h4>
      <p>Because maybe today you only want a simple business card site, but in 3 months:</p>
      
      <ul class="list-disc pl-6 my-4 space-y-1">
        <li>an online store,</li>
        <li>a blog with advice,</li>
        <li>a podcast,</li>
        <li>an AI chat on the site,</li>
        <li>a contact form with CRM,</li>
        <li>automatic invoice issuing...</li>
      </ul>
      
      <div class="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg my-6">
        <h4 class="text-lg font-semibold text-amber-700 dark:text-amber-300">⚠️ And this is where it gets interesting...</h4>
        <p class="text-amber-700 dark:text-amber-300">Because maybe: you're not just looking for a "website," but a system to manage your entire business?</p>
      </div>
      
      <p>Maybe you need:</p>
      
      <ul class="list-disc pl-6 my-4 space-y-1">
        <li>A customer panel with orders and statuses</li>
        <li>A newsletter with audience segmentation</li>
        <li>A dashboard with statistics and customer behavior analysis</li>
        <li>SMS and email notifications with automatic reminders</li>
        <li>A document scanner with AI analysis (e.g., contracts, invoices)</li>
        <li>Electronic signatures for clients</li>
        <li>Integration with WhatsApp, Slack, databases, Google Calendar</li>
      </ul>
      </section>
      
      <section id="automation">
      <h3>🧩 And most importantly — automation.</h3>
      <p>Almost everything can be automated today:<br>
      from simple reminders, through order processes, to customer service.<br>
      Some processes that take you an hour a day today can be replaced with code.<br>
      And that means: more time for you or fewer positions to pay for.</p>
      </section>
      
      <section id="conclusion">
      <h3>✅ So what should you do?</h3>
      <p>Before you start looking for a developer, answer a few simple questions:</p>
      
      <ol class="list-decimal pl-6 my-4 space-y-2">
        <li><strong>What's my goal?</strong><br>
        Should the website just look nice? Or should it earn money?</li>
        
        <li><strong>Do I want to build it myself, or would I rather delegate it?</strong><br>
        Your hours are valuable. It's not worth wasting them on things you'll end up giving to a specialist anyway.</li>
        
        <li><strong>Am I planning to develop the site?</strong><br>
        If so — it's better to build a solid foundation now than to tear everything down in a year.</li>
      </ol>
      
      <h3>💬 What about costs?</h3>
      <p>You're probably already thinking about it — "Okay, but how much does a website cost?"</p>
      
      <p>The answer is: it depends.<br>
      Just as you don't buy "just a car," but choose between a city car and a transport van, the same applies to websites.</p>
      
      <h3>📖 Check out the next article:</h3>
      <p><a href="#" class="text-primary hover:underline">👉 How much does a website cost? What affects the price and what are you actually buying? →</a></p>
      
      <div class="bg-green-50 dark:bg-green-950 p-6 rounded-lg my-8 text-center">
        <h3 class="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">🤝 Need help choosing?</h3>
        <p class="text-green-700 dark:text-green-300 mb-4">You don't have to do everything yourself.<br>
        If you want, we can go through this process together — step by step, no pressure.</p>
        <a href="/#contact" class="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">📩 Contact us — we'll help you choose wisely.</a>
      </div>
      </section>
    `
  };

  // Create breadcrumb items
  const breadcrumbItems = [
    { label: t('breadcrumbs.home'), href: '/' },
    { label: t('breadcrumbs.knowledgeBase'), href: '/baza-wiedzy' },
    { label: article.title, isCurrentPage: true }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Sticky Table of Contents Sidebar */}
      <aside className="hidden md:block md:col-span-3 lg:col-span-2">
        <div className="sticky top-24 pr-4 max-h-[calc(100vh-100px)] overflow-y-auto">
          <h3 className="text-lg font-medium mb-4">{locale === 'pl' ? 'Spis treści' : 'Table of Contents'}</h3>
          <nav className="space-y-1">
            {tableOfContents.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group flex items-center py-2 px-3 text-sm rounded-md hover:bg-muted transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-2 group-hover:bg-primary"></div>
                <span>{section.title}</span>
              </a>
            ))}
          </nav>

          <div className="mt-6 p-4 border border-border rounded-lg bg-card">
            <h4 className="font-medium text-sm mb-3">{locale === 'pl' ? 'Zapisz na później:' : 'Save for later:'}</h4>
            <div className="flex flex-col space-y-2">
              <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <CheckCircle2 className="h-4 w-4" />
                <span>{locale === 'pl' ? 'Dodaj do zakładek' : 'Add to bookmarks'}</span>
              </button>
              <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span className="i-lucide-share2 h-4 w-4"></span>
                <span>{locale === 'pl' ? 'Udostępnij' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:col-span-9 lg:col-span-8">
        {/* Breadcrumbs */}
        <Breadcrumb items={breadcrumbItems} locale={locale} />

        {/* Back button */}
        <div className="mb-6">
          <Link
            href={{ pathname: '/baza-wiedzy' }}
            className="inline-flex items-center text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t('backToList')}
          </Link>
        </div>

        {/* Article header */}
        <div className="mb-8 border-b pb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-xl text-muted-foreground mb-4">{article.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-4">
            <div className="flex items-center px-3 py-1 bg-muted rounded-full">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{article.publishDate}</span>
            </div>
            <div className="flex items-center px-3 py-1 bg-muted rounded-full">
              <Clock className="h-4 w-4 mr-1" />
              <span>{article.readingTime}</span>
            </div>
            <div className="flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full">
              <Tag className="h-4 w-4 mr-1" />
              <span>{article.category}</span>
            </div>
          </div>
        </div>

        {/* Mobile Table of Contents - Expandable */}
        <div className="md:hidden mb-6 p-4 bg-card rounded-lg border">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="font-medium">{locale === 'pl' ? 'Spis treści' : 'Table of Contents'}</span>
              <span className="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <nav className="mt-2 pt-2 border-t space-y-1">
              {tableOfContents.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block py-2 text-sm hover:text-primary transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </details>
        </div>

        {/* Article content */}
        <div className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Author section */}
        <div className="mt-12 p-6 bg-card border rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                MR
              </div>
            </div>
            <div>
              <h3 className="font-medium">Michał Rowiński</h3>
              <p className="text-sm text-muted-foreground">CEO NextGen Sites</p>
            </div>
          </div>
        </div>

        {/* Related articles */}
        <div className="mt-12 border-t pt-8">
          <h3 className="text-2xl font-bold mb-4">{t('relatedArticles')}</h3>

          <div className="grid grid-cols-1 gap-4">
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <span className="text-xs font-medium px-2.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full inline-block mb-2">
                {locale === 'pl' ? 'Wkrótce' : 'Coming soon'}
              </span>
              <h4 className="text-lg font-medium mb-1">
                {locale === 'pl'
                  ? 'Ile kosztuje strona internetowa? Co wpływa na cenę?'
                  : 'How much does a website cost? What affects the price?'}
              </h4>
              <p className="text-muted-foreground mb-2 text-sm line-clamp-2">
                {locale === 'pl'
                  ? 'Poznaj rzeczywiste czynniki wpływające na koszt strony internetowej i jak wybrać najlepszą opcję dla swojego biznesu.'
                  : 'Learn the real factors that affect website cost and how to choose the best option for your business.'}
              </p>
              <span className="text-primary text-sm">{t('readMore')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right sidebar with CTA */}
      <aside className="hidden lg:block lg:col-span-2">
        <div className="sticky top-24">
          <div className="bg-card border rounded-lg p-4 mb-6">
            <h4 className="font-medium mb-3">{locale === 'pl' ? 'Potrzebujesz pomocy?' : 'Need help?'}</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {locale === 'pl'
                ? 'Skontaktuj się z nami, aby omówić Twój projekt strony internetowej.'
                : 'Contact us to discuss your website project.'}
            </p>
            <a
              href="/#contact"
              className="w-full bg-primary text-primary-foreground text-center py-2 px-4 rounded-md text-sm inline-block hover:bg-primary/90 transition-colors"
            >
              {locale === 'pl' ? 'Skontaktuj się' : 'Contact us'}
            </a>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-3">{locale === 'pl' ? 'Zapisz na później:' : 'Save for later:'}</h4>
            <div className="flex flex-col space-y-2">
              <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <CheckCircle2 className="h-4 w-4" />
                <span>{locale === 'pl' ? 'Dodaj do zakładek' : 'Add to bookmarks'}</span>
              </button>
              <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span className="i-lucide-share2 h-4 w-4"></span>
                <span>{locale === 'pl' ? 'Udostępnij' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
} 
