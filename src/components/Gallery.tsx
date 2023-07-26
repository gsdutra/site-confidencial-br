'use client'

import { Carousel } from "react-responsive-carousel";
import ImageGallery from 'react-image-gallery';
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Props {
    num: number;
    title: string;
}

export default function Gallery(props: Props) {

    const items = Array.from({ length: props.num }, (_, i) => {
        return {
          original: `/roupas/${props.title.toLowerCase()}/${i + 1}.png`,
          thumbnail: `/roupas/${props.title.toLowerCase()}/${i + 1}.png`,
          originalClass: 'object-cover',
        };
      });

    return (
        <div className="mx-4 my-8 max-w-[450px] w-[100vw] p-2">
            <h3 className="text-center text-3xl">{props.title}</h3>
            <ImageGallery items={items} />
        </div>
    )
}