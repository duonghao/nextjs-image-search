import { Header, Footer, CategoryFilter, DragDropFile } from "@/components";

export default async function Home(props) {
  return (
    <>
      <h1>{props.hi}</h1>
      <Header></Header>
      <main>
        <DragDropFile></DragDropFile>
      </main>
      <Footer></Footer>
    </>
  )
}