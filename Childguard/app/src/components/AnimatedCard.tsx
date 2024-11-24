import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { EducationalResource } from '../models/EducationalResource';

const AnimatedCard: React.FC<EducationalResource> = ({
    title,
    content,
    category,
    publishedDate,
    videoId
}) => {

// YouTube URL based on the video ID
const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

const [open, setOpen] = useState(false);

const handleClose = () => {
    setOpen(false);
};

const handleExploreClick = () => {
    setOpen(true);
};

// Truncate content to 6 words
const truncatedContent = content.split(' ').slice(0, 10).join(' ');

const formatDate = (date: string | Date): string => {
    if (typeof date === 'string') {
        return new Date(date).toLocaleDateString();
    }
    return date.toLocaleDateString(); 
};

return (
    <>
        <Card sx={{
            width: 320, // Fixed width
            height: 380, // Fixed height
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            backgroundColor: 'transparent',
            backdropFilter: 'blur(10px)',
            border: '2px solid grey',
            '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                border: '2px solid transparent',
            }
        }}>
            <CardMedia
                component="iframe" // Changed to iframe for embedding YouTube video
                height="180" // Adjust as needed
                src={`https://www.youtube.com/embed/${videoId}`} // Embed YouTube video
                title={`${title} - YouTube video`}
                frameBorder="0" // Remove borders
                allowFullScreen // Allow fullscreen playback
            />
            <CardContent sx={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'transparent', border: 'none' }}>

                <Typography gutterBottom variant="h5" component="div" sx={{ color: 'whitesmoke', mt: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '17px' }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '11px', color: 'whitesmoke' }}>
                    {category} - Published on: {formatDate(publishedDate)}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, fontSize: '15px', color: 'whitesmoke' }}>
                    {truncatedContent}...
                </Typography><br />
                <Button variant="outlined" sx={{ position: 'absolute', display: 'fixed', bottom: 0, width: '7vw', backgroundColor: 'grey', color: 'whitesmoke', border: 'none' }} onClick={handleExploreClick}>Explore</Button>
            </CardContent>
        </Card>
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { backgroundColor: 'transparent' } }}>
            <Box
                sx={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                    borderRadius: '10px',
                }}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <iframe
                        width="550"
                        height="250"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                    <Typography variant="body2" color="text.secondary">
                        {category} - Published on: {formatDate(publishedDate)}
                    </Typography><br />
                    <Typography variant="body1">
                        {content}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={() => window.open(youtubeUrl, '_blank')}>Watch</Button>
                </DialogActions>
            </Box>
        </Dialog>
    </>
    );
};

export default AnimatedCard;
