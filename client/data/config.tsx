import { NextSeoProps } from 'next-seo'
import { Logo } from './logo'

const siteConfig = {
  seo: {
    title: 'ThreeMail',
    description: 'Decentralized and secure Messaging',
  } as NextSeoProps,
  termsUrl: '#',
  privacyUrl: '#',
  header: {
    links: [
      {
        id: 'pricing',
        label: 'Pricing',
      },
      {
        id: 'faq',
        label: 'FAQ',
      },
      {
        label: 'Connect',
        href: '#',
        variant: 'primary',
      },
    ],
  }
}

export default siteConfig
