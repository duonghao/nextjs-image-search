import { Header, Footer, CategoryFilter } from "@/components";
import { storefront } from "@/utils";

export default async function Home(props) {

  const { data } = await storefront(productsQuery);

  return (
    <>
      <h1>{props.hi}</h1>
      <Header></Header>
      <main>
        <CategoryFilter data={data}></CategoryFilter>
      </main>
      <Footer></Footer>
    </>
  )
}

const gql = String.raw

const productsQuery = gql`
query Products {
  products(first:5) {
    edges {
      node {
        title
        handle
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first:1) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  }
}
`
