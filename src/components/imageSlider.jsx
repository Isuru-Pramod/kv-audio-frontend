import { useState } from "react";

export default function ImageSlider(props){
    const images = props.images;
    console.log(images);
    const [selectedImage, setSelectedImage] = useState(images[0]);
    return(
        <div className="w-full flex flex-col items-center ">
            <img src={selectedImage} alt="product" className="w-full h-[300px] md:h-[500px] object-cover"/>
            <div className="w-full mt-[20px] h-[90px] flex justify-center items-center">
                {
                    images.map((img,index)=>{
                        return <img key={index} src={img} alt="product" className={`w-[70px] h-[70px] mr-[2px] object-cover cursor-pointer ${img == selectedImage && "border border-accent"}`} onClick={
                            ()=>{
                                setSelectedImage(img);
                            }
                        }/>
                    })
                }
            </div>

        </div>
    )
}