import "./card.css"

interface CardProps { 
    title: string;
    image: string;
    price: number;
}

export function Card({ title, image, price }: CardProps) {
    return (
        <div className="card">
            <img src={image} alt={title} className="card-image" />
            <h2 className="card-title">{title}</h2>
            <p className="card-price">${price.toFixed(2)}</p>
        </div>
    );
}