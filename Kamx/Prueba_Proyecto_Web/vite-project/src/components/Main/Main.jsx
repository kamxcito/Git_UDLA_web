import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import './Main.css'
import Cardtest from '../Cardtest/Cardtest.jsx'

// Cada objeto aporta el contenido de una tarjeta; Cardtest se encarga de mostrarlo.
const stories = [
  {
    id: 'origen',
    category: 'Desde la raíz',
    title: 'Del árbol a tu mesa.',
    description: 'Un vistazo al lugar donde empieza todo: entre hojas, ramas y mucho verde.',
    image: '/Persea_americana_fruit_2.JPG',
    alt: 'Aguacates creciendo entre las hojas de un árbol',
    detail: 'Antes de llegar a nuestra cocina, el aguacate crece entre las ramas de un árbol. Esta fotografía invita a verlo de otra manera: como un fruto que forma parte de un paisaje, mucho antes de formar parte de un plato.',
  },
  {
    id: 'variedades',
    category: 'Distintas formas de ser',
    title: 'Todo un mundo de variedades.',
    description: 'Alargados, redondos, de piel lisa o rugosa. Hay mucho más por descubrir.',
    image: '/Seedless_Avocado_in_Mexico.jpg',
    alt: 'Aguacates verdes de forma alargada colgando de una rama',
    detail: 'No todos los aguacates se ven iguales. Su forma, tamaño y textura invitan a observarlos de cerca. En esta imagen comparativa puedes explorar nombres como Hass, Reed, Fuerte y Pinkerton y observar qué hace distinta a cada variedad.',
    detailImage: '/Types-of-Avocados.jpg',
    detailAlt: 'Lámina comparativa con imágenes y nombres de distintas variedades de aguacate',
  },
  {
    id: 'cocina',
    category: 'Inspiración cotidiana',
    title: 'Tu próximo ingrediente favorito.',
    description: 'Una tostada, una ensalada o una idea nueva. Hazle un espacio en tu cocina.',
    image: '/oardefault.jpg',
    alt: 'Una cesta con aguacates enteros y cortados sobre una mesa',
    detail: 'Empieza con algo sencillo: una tostada con aguacate, unas gotas de limón y tus condimentos favoritos. También puedes añadirlo en trozos a una ensalada o machacarlo para acompañar otros ingredientes. La idea es experimentar a tu gusto.',
  },
]

const Main = () => {
  const [selectedStory, setSelectedStory] = useState(null)

  return (
    <main id="contenido" tabIndex={-1}>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span aria-hidden="true" /> Fresco por naturaleza</p>
          <h1 className="serif" id="hero-title">Todo lo bueno<br />empieza en<br /><em>verde.</em></h1>
          <p className="hero-description">Pequeño por fuera. Lleno de posibilidades por dentro. Descubre el aguacate y encuentra una nueva forma de disfrutarlo cada día.</p>
          <Button className="primary-link" component="a" href="#descubre" variant="contained" disableElevation>
            Descubre el aguacate <span aria-hidden="true">↗</span>
          </Button>
          <p className="hero-footnote"><span aria-hidden="true">✳</span> Un fruto sencillo. Un gusto extraordinario.</p>
        </div>
        <figure className="hero-visual">
          <div className="hero-image-frame">
            <img className="hero-image" src="/Health-GettyImages-1132791734-06d350df70df4ffb95a8bf4d2b5bfc66.jpg" alt="Un aguacate entero y otro abierto sobre un fondo verde" fetchPriority="high" width="1500" height="1000" />
            <span className="hero-image-label">Naturalmente irresistible.</span>
          </div>
          <figcaption><span>01 / EL PROTAGONISTA DE HOY</span><span>Persea americana</span></figcaption>
        </figure>
      </section>

      <section className="discover container" id="descubre" aria-labelledby="discover-title">
        <div className="section-heading">
          <div><p className="eyebrow">Una mirada más de cerca</p><h2 className="serif" id="discover-title">Un fruto, muchas historias.</h2></div>
          <p>Conoce de dónde viene.<br />Explora todo lo que puede ser.</p>
        </div>
        <div className="cards-grid">
          {stories.map((story, index) => (
            <Cardtest key={story.id} story={story} number={index + 1} onExplore={() => setSelectedStory(story)} />
          ))}
        </div>
      </section>

      <section className="guide container" id="guia" aria-labelledby="guide-title">
        <div className="guide-intro"><p className="eyebrow">De la compra al primer bocado</p><h2 className="serif" id="guide-title">Lo bueno está<br />en los detalles.</h2><p>Una pequeña guía para disfrutarlo a tu manera.</p></div>
        <ol className="guide-steps">
          <li><span className="step-number">01</span><div><h3>Elige con calma.</h3><p>Observa la piel y busca un fruto sin golpes ni zonas dañadas.</p></div></li>
          <li><span className="step-number">02</span><div><h3>Encuentra su punto.</h3><p>Presiona suavemente con la palma: debe ceder un poco, sin sentirse demasiado blando.</p></div></li>
          <li><span className="step-number">03</span><div><h3>Hazlo tuyo.</h3><p>Córtalo, sírvelo y combínalo con tus ingredientes favoritos.</p></div></li>
        </ol>
      </section>

      <Dialog open={Boolean(selectedStory)} onClose={() => setSelectedStory(null)} maxWidth="sm" fullWidth aria-labelledby="story-title" className="story-dialog">
        {selectedStory && <>
          <DialogTitle id="story-title" className="story-dialog-title">{selectedStory.title}</DialogTitle>
          <DialogContent>
            <img className="story-dialog-image" src={selectedStory.detailImage || selectedStory.image} alt={selectedStory.detailAlt || selectedStory.alt} />
            <p className="story-dialog-text">{selectedStory.detail}</p>
          </DialogContent>
          <DialogActions><Button onClick={() => setSelectedStory(null)}>Volver a explorar</Button></DialogActions>
        </>}
      </Dialog>
    </main>
  )
}

export default Main
