import { HStack, Text } from '@chakra-ui/react'

export default {
  title: 'Pricing for every stage',
  description:
    'Pay never and get life-time access to our secure communication.',
  plans: [
    {
      id: 'oss',
      title: 'Open Source',
      description: 'Validate for yourself',
      price: 'FREE',
      features: [
        {
          title: 'MIT License',
        },
        {
          title: 'Sepolia Testnet',
        },
        {
          title: 'Unlimited Mails',
        },
        {
          title: 'Modals manager',
        },
        {
          title: 'Asymmetric encryption',
        },
        {
          title: 'And much more...',
        },
      ],
      action: {
        href: '#',
      },
    },
    {
      id: 'bootstraped',
      title: 'Bootstraped',
      description: 'Blazingly fast',
      price: 'FREE',
      isRecommended: true,
      features: [
        {
          title: 'MIT License',
        },
        {
          title: 'Sepolia Testnet',
        },
        {
          title: 'Unlimited Mails',
        },
        {
          title: 'Modals manager',
        },
        {
          title: 'Asymmetric encryption',
        },
        {
          title: 'And much more...',
        },
      ],
      action: {
        href: '#',
      },
    },
    {
      id: 'secure',
      title: 'Secure',
      description: 'Contact me for similar projects :}',
      price: (
        <HStack>
          <Text textDecoration="line-through" fontSize="sm" color="gray.400">
            €100
          </Text>
          <Text>FREE</Text>
        </HStack>
      ),
      features: [
        {
          title: 'MIT License',
        },
        {
          title: 'Sepolia Testnet',
        },
        {
          title: 'Unlimited Mails',
        },
        {
          title: 'Modals manager',
        },
        {
          title: 'Asymmetric encryption',
        },
        {
          title: 'And much more...',
        },
      ],
      action: {
        href: '#',
      },
    },
  ],
}
