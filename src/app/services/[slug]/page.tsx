import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import ServiceGraphic from '@/components/graphics/ServiceGraphic'

import { siteConfig } from '@/lib/config'
import pageStyles from '@/components/ui/PageHero.module.scss'
import styles from './Service.module.scss'

export function generateStaticParams() {
  return siteConfig.services.map(s => ({ slug: s.slug }))
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = siteConfig.services.find(s => s.slug === slug)
  if (!service) return { robots: { index: false, follow: false } }
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.description,
    },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const service = siteConfig.services.find(s => s.slug === slug)
  if (!service) notFound()

  const col = service.color
  const others = siteConfig.services.filter(s => s.slug !== service.slug)
  return (
    <>
      <main>
        {/* Hero */}
        <section className={pageStyles.hero}>
          <div className="wrap">
            <nav className={pageStyles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/services" className={pageStyles.breadcrumbLink}>Services</Link>
              <span className={pageStyles.breadcrumbSep}>/</span>
              <span className={pageStyles.breadcrumbCurrent}>{service.title}</span>
            </nav>

            <div className={styles.heroGrid}>
              <div>
                <div className={pageStyles.eyebrow}>
                  <span className={pageStyles.eyebrowLine} />
                  Service
                </div>
                <h1 className={pageStyles.h1}>
                  <em>{service.title}</em>
                </h1>
                <p className={styles.heroDesc}>{service.description}</p>
                <Button href="/contact" showArrow>Discuss this service</Button>
              </div>

              {/* Unique graphic per service */}
              <div style={{ height: 360 }}>
                <ServiceGraphic slug={service.slug} />
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className={styles.content}>
          <div className="wrap">
            <div className={styles.contentGrid}>
              <div>
                <div className={clsx(styles.colTag, styles[col])}>
                  <span />What&apos;s included
                </div>
                <div className={styles.highlights}>
                  {service.highlights.map(h => (
                    <div key={h} className={styles.highlight}>
                      <div className={clsx(styles.highlightCheck, styles[col])}>
                        <Icon name="check" size={14} />
                      </div>
                      <span className={styles.highlightText}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className={clsx(styles.colTag, styles[col])}>
                  <span />Our approach
                </div>
                <p className={clsx(styles.manifesto, styles[col])}>
                  {service.manifesto}
                </p>
                <div className={styles.whenLabel}>When to reach out</div>
                <div className={styles.whenList}>
                  {service.when.map(w => (
                    <div key={w} className={clsx(styles.whenItem, styles[col])}>{w}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className={styles.others}>
          <div className="wrap">
            <div className={styles.othersTag}><span />Other services</div>
            <div className={styles.othersGrid}>
              {others.map(s => (
                <Link key={s.slug} href={`/services/${s.slug}`} className={styles.otherCard}>
                  <h3 className={styles.otherTitle}>{s.title}</h3>
                  <p className={styles.otherDesc}>{s.shortDesc}</p>
                  <span className={styles.otherMore}>Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <div className="wrap">
            <h2 className={styles.ctaHeading}>Need {service.title.toLowerCase()}?</h2>
            <p className={styles.ctaDesc}>
              A 30-minute technical call — no sales pitch, just engineering conversation.
            </p>
            <Button href="/contact" size="large" showArrow>
              Schedule a technical consultation
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
