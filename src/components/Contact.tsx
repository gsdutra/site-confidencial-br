import Link from "next/link"

export default function Contact() {
    return (<div className="flex flex-col justify-center items-center w-full bg-[#16161c] text-center p-6">
        <div className="text-3xl">Contato</div><br/>
        <div className="text-xl max-w-[800px] p-2 text-center">
            Email: <br />
            confidencialbr@confidencialbr.com.br <br />
            <Link href="mailto: abc@example.com" className="button bt">
                <img src='/email.svg' width={30} className="mr-5"></img><div>Enviar Email</div>
            </Link>
            WhatsApp: <br />
            +55 (11) 9 7624-8350 <br />
            +55 (11) 9 9113-2613
            <Link href="https://wa.me/5511976248350" className="button bt">
                <img src='/whatsapp.png' width={30} className="mr-5"></img><div>Enviar WhatsApp</div>
            </Link>
        </div>
    </div>)
}