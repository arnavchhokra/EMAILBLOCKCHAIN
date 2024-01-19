import { forwardRef } from '@chakra-ui/react'
import Web3 from 'web3'
import { Button, ButtonProps } from '@saas-ui/react'
import { useState } from 'react'
import Link from 'next/link'

export interface NavLinkProps extends ButtonProps {
  isActive?: boolean
  href?: string
  id?: string
}

export const NavLink = forwardRef<NavLinkProps, 'a'>((props, ref) => {
  const { href, type, isActive, ...rest } = props
  const [address, setaddress] = useState("");
  const [web3, setWeb3] = useState(null);


  const connectToWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();
      setaddress(accounts[0]);
      window.location.href = "/mail";
    } else {
      alert("Please install MetaMask to use this application");
    }
  };

  return (
    <Button
      as={Link}
      onClick={connectToWeb3}
      href="#"
      ref={ref}
      variant="nav-link"
      lineHeight="2rem"
      isActive={isActive}
      fontWeight="medium"
      {...rest}
    />
  )
})

NavLink.displayName = 'NavLink'
