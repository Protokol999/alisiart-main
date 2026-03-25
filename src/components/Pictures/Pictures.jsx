import {
  bigSea,
  picture1,
  picture2,
  picture3,
  picture4,
  picture5,
  picture6,
  picture7,
  picture8
} from '../../assets/images/index';
import './Pictures.scss';

const pictures = [
  { src: picture1, alt: 'Painting 1', className: 'pictures__item--1' },
  { src: picture2, alt: 'Painting 2', className: 'pictures__item--2' },
  { src: picture3, alt: 'Painting 3', className: 'pictures__item--3' },
  { src: picture4, alt: 'Painting 4', className: 'pictures__item--4' },
  { src: picture5, alt: 'Painting 5', className: 'pictures__item--5' },
  { src: picture6, alt: 'Painting 6', className: 'pictures__item--6' },
  { src: picture7, alt: 'Painting 7', className: 'pictures__item--7' },
  { src: bigSea, alt: 'Painting 8', className: 'pictures__item--8' },
  { src: picture8, alt: 'Painting 9', className: 'pictures__item--9' }
];

export const Pictures = () => {
  return (
    <section className='pictures' aria-label='Art gallery'>
      {pictures.map(({ src, alt, className }) => (
        <div key={alt} className={`pictures__item ${className}`}>
          <img className='pictures__image' src={src} alt={alt} />
        </div>
      ))}
    </section>
  );
};
