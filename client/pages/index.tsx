import * as React from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import {
  Container,
  Box,
  Stack,
  HStack,
  ButtonGroup,
  Button,
  Icon,
  Heading,
  Text,
  Wrap,
  Tag,
  useClipboard,
  IconButton,
  VStack,
  Flex,
} from '@chakra-ui/react'
import { SEO } from 'components/seo/seo'

import { FallInPlace } from 'components/motion/fall-in-place'
import { Hero } from 'components/hero'
import { Link, Br } from '@saas-ui/react'
import { Em } from 'components/typography'
import { NextjsLogo, ChakraLogo } from 'components/logos'
import {
  FiArrowRight,
  FiBox,
  FiCheck,
  FiCode,
  FiCopy,
  FiFlag,
  FiGrid,
  FiLock,
  FiSearch,
  FiSliders,
  FiSmile,
  FiTerminal,
  FiThumbsUp,
  FiToggleLeft,
  FiTrendingUp,
  FiUserPlus,
} from 'react-icons/fi'
import { BackgroundGradient } from 'components/gradients/background-gradient'
import { Faq } from 'components/faq'
import { Pricing } from 'components/pricing/pricing'

import { ButtonLink } from 'components/button-link/button-link'
import { Testimonial, Testimonials } from 'components/testimonials'

import faq from 'data/faq'
import testimonials from 'data/testimonials'
import pricing from 'data/pricing'

import Web3 from 'web3';
import RegisteredSubscription  from 'web3'
import { useState } from "react";


const Home: NextPage = () => {
  return (
    <Box>
      <SEO
        title="ThreeMail"
        description="Secure and Decentralized Messaging"
      />
      <Box>
        <HeroSection />


        <TestimonialsSection />

        <PricingSection />
        <FaqSection />
      </Box>
    </Box>
  )
}

interface WindowWithEthereum extends Window {
  ethereum?: any;
}


const HeroSection: React.FC = () => {
  const [address, setaddress] = useState("");
  const [web3, setWeb3] = useState<Web3 | null>(null); // Corrected state type
  const connectToWeb3 = async () => {
  if (typeof window !== "undefined") {
    console.log("Window is defined");
    const win = window as WindowWithEthereum;
    if (win.ethereum) {
      console.log("MetaMask is installed");
      await win.ethereum.enable();
      const web3 = new Web3(win.ethereum);
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();
      setaddress(accounts[0]);
      window.location.href = "/mail";
    } else {
      console.log("MetaMask is not installed");
      alert("Please install MetaMask to use this application");
    }
  } else {
    console.log("Window is not defined");
    alert("Please use a browser to access this application");
  }
};

  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient height="100%" />
      <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="40">
        <Stack direction={{ base: 'column', lg: 'row' }} alignItems="center">
          <Hero
            id="home"
            justifyContent="flex-start"
            px="0"
            title={
              <FallInPlace>
                Messaging made
                <Br /> secure and reliable
              </FallInPlace>
            }
            description={
              <FallInPlace delay={0.4} fontWeight="medium">
                ThreeMail is a <Em>Secure Messaging platform</Em>
                <Br /> that allows for decentralized communication <Br />{' '}
                along with encyption tools.
              </FallInPlace>
            }
          >
            <FallInPlace delay={0.8}>

              <ButtonGroup style={{marginTop:'30px'}} spacing={4} alignItems="center">
                <ButtonLink colorScheme="primary" size="lg" href="#" onClick={connectToWeb3}>
Connect                </ButtonLink>
              </ButtonGroup>
            </FallInPlace>
          </Hero>
          <Box
            height="600px"
            position="absolute"
            display={{ base: 'none', lg: 'block' }}
            left={{ lg: '60%', xl: '55%' }}
            width="80vw"
            maxW="1100px"
            margin="0 auto"
          >
            <FallInPlace delay={1}>
              <Box overflow="hidden" height="100%">
              </Box>
            </FallInPlace>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}



const TestimonialsSection = () => {
  const columns = React.useMemo(() => {
    return testimonials.items.reduce<Array<typeof testimonials.items>>(
      (columns, t, i) => {
        columns[i % 3].push(t)

        return columns
      },
      [[], [], []]
    )
  }, [])

  return (
    <Testimonials
      title={testimonials.title}
      columns={[1, 2, 3]}
      innerWidth="container.xl"
    >
      <>
        {columns.map((column, i) => (
          <Stack key={i} spacing="8">
            {column.map((t, i) => (
              <Testimonial key={i} {...t} />
            ))}
          </Stack>
        ))}
      </>
    </Testimonials>
  )
}

const PricingSection = () => {
  return (
    <Pricing {...pricing}>
      <Text p="8" textAlign="center" color="muted">
        😊😊😊
      </Text>
    </Pricing>
  )
}

const FaqSection = () => {
  return <Faq {...faq} />
}

export default Home

export async function getStaticProps() {
  return {
    props: {
      announcement: {
        title: 'Threemail is FREE until 1st of March',
        href: '#',
      },
    },
  }
}
