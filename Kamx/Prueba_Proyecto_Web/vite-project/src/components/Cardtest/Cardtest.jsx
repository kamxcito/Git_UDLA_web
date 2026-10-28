import './Cardtest.css'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function Cardtest({ story, number, onExplore }) {
  return (
    <Card component="article" className="avocado-card" elevation={0}>
      <div className="card-image-frame">
        <CardMedia component="img" className="card-image" image={story.image} alt={story.alt} loading="lazy" width="600" height="400" />
        <span className="card-number" aria-hidden="true">0{number}</span>
      </div>
      <CardContent className="card-content">
        <Typography component="p" className="card-category">{story.category}</Typography>
        <Typography component="h3" className="card-title">{story.title}</Typography>
        <Typography component="p" className="card-description">{story.description}</Typography>
      </CardContent>
      <CardActions className="card-actions">
        <Button className="card-link" onClick={onExplore} aria-label={`Descubrir: ${story.title}`}>
          Descubrir <span aria-hidden="true">↗</span>
        </Button>
      </CardActions>
    </Card>
  )
}
