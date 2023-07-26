import Image from 'next/image'
import Header from '@/components/Header'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'

export default function Home() {
  return (<>
    <Header />
    <main className="flex min-h-screen flex-col items-center w-full">
      <div className="text-[17px] px-6 mt-6 max-w-[715px]">Somos uma confecção de roupas especiais personalizadas e de alta qualidade. <br />
        Produzimos desde roupas casuais, bonés, peças de moda até uniformes corporativos, roupas para eventos, etc.<br />
        Trabalhamos com tecidos com tratamento antiviral, dry e U.V.</div> <br />

      <div className="showcontact flex flex-col items-center mb-7 w-full">
        <a className="italic rounded-full px-2 text-lg mb-3 cursor-pointer">Fale conosco ▼</a>
        <Contact />
      </div>

      <div className="text-xl">Conheça nossos produtos!</div>

      <div className='flex w-full flex-wrap align-center justify-center'>
        <Gallery title='Camisas' num={4} />
        <Gallery title='Coletes' num={7} />
        <Gallery title='Jaquetas' num={4} />
        <Gallery title='Moletons' num={3} />
        <Gallery title='Polos' num={4} />
      </div>

      <div className="text-3xl mt-10 mb-4 p-4 text-center">Quem somos</div>
      <div className="text-xl max-w-[800px] p-6">
        Equipe com mais de 30 anos de experiência no ramo de confecção. <br />
        Somos especialistas em produzir roupas para eventos, uniformes e roupas casuais. <br />
        Trabalhamos com forncedores que possuem insumos da mais alta qualidade e tecnologia, com tecidos com tratamento antiviral, dry e U.V. <br />
      </div>

      <div className="text-3xl mt-10 p-4 text-center">Nossos principais clientes</div>
      <img src="/clientes.png" className="w-[90vw] object-scale-down" />

      <Contact />

      <div className="mt-[120px]"></div>
    </main>
  </>)
}
