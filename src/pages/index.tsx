import React from "react"
import Main from "@/components/layouts/Main";
import Container from "@/components/Container";
import {Divider} from "@mui/material";
import FullWidthBanner from "@/components/FullWidthBanner";
import ProductsGrid from "@/components/Products/ProductsGrid/ProductsGrid";

export default function Home() {
  return (
      <Main colorInvert={true}>
          <Container>
              <FullWidthBanner imgSrc="https://i.ibb.co/pv7m5vC/Banner.png"/>
          </Container>
          <Container>
              <ProductsGrid/>
          </Container>
      </Main>
  )
}
