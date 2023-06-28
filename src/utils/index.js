import weaviate from 'weaviate-ts-client';

export async function storefront(query, variables = {}) {

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_ACCESS_TOKEN,
            },
            body: JSON.stringify({ query, variables }),
        });

    return response.json();
}

export async function weviate(imgb64) {
    
    const client = weaviate.client({
        scheme: 'http',
        host: 'localhost:8080',
    });

    const weviateResponse = await client.graphql
        .get()
        .withClassName('ShopifyImage')
        .withFields(['gid'])
        .withNearImage({ image: imgb64 })
        .withLimit(5)
        .do();

    const ids = weviateResponse.data.Get.ShopifyImage.map(({gid}) => {
        return gid;
    })

    const gql = String.raw

    const similarProductsQuery = gql`
    query ProductsByID ($ids: [ID!]!) {
        nodes(ids: $ids) {
            ... on Product {
                title
                priceRange {
                    minVariantPrice {
                    amount
                    }
                }
                images(first: 1) {
                    edges {
                        node {
                            url
                            altText
                        }
                    }
                }
            }
        }
    }`

    const similarProductsQueryVariables = { "ids": ids }

    const { data } = await storefront(similarProductsQuery, similarProductsQueryVariables)

    return data;
}

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});