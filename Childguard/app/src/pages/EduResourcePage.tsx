import React, { useState } from 'react';
import { Toolbar, Typography, InputBase, Box, Card, CardActionArea, CardContent, Grid } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { EducationalResource } from '../models/EducationalResource';
import AnimatedCard from '../components/AnimatedCard';
import childCompImg from '../assets/ChildEdu.webp';
import useFetchResources from '../services/fetchEduResources';
import '../App.css';
import kidsProgrammingImg from '../assets/Kids-friendly Programming.jpeg';
import learnEnglishImg from '../assets/Learn English.webp';
import physicsImg from '../assets/physics.webp';
import chemistryImg from '../assets/chemistry.avif';
import mathImg from '../assets/mathematics.jpeg';
import EduResBg from '../assets/EduResbg.jpeg';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(3),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '40ch',
        },
    },
}));

function EducationalResourcePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const { data: resources, loading, error } = useFetchResources('http://localhost:3000/eduResources');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
        setExpandedCategory(null); // Reset expansion on search change
        console.log(filteredResources);
        console.log(groupedResources);
    };

    if (loading) return <Box sx={{ p: 3 }}>Loading...</Box>;
    if (error) return <Box sx={{ p: 3 }}>{error}</Box>;

    //reload functionality
    // const handleReload = () => {
    //     window.location.reload();
    // };

    // const handleCategoryClick = (category: string) => {
    //     setExpandedCategory(expandedCategory === category ? null : category);
    // };

    const handleSeeAllCategories = () => {
        const categorySection = document.getElementById('category-section');
        if (categorySection) {
            categorySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const categories = Array.from(new Set(resources.map(resource => resource.category)));
    const filteredResources = resources.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm) || resource.content.toLowerCase().includes(searchTerm)
    );
    const groupedResources = filteredResources.reduce((acc, resource) => {
        acc[resource.category] = acc[resource.category] || [];
        acc[resource.category].push(resource);
        return acc;
    }, {} as { [key: string]: EducationalResource[] });

    const categoryImages: Record<string, string> = {
        'Kid-friendly Programming': kidsProgrammingImg,
        'Learn English': learnEnglishImg,
        'Physics': physicsImg,
        'Chemistry': chemistryImg,
        'Mathematics': mathImg,
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <div style={{ backgroundImage: `url(${EduResBg})` }}>
                <div className="resource-container">
                    <header>
                        <h1>
                            Childguard Educational Resource is dedicated to delivering rich and deserving educational experiences</h1>
                        <p>to children of all ages, fostering a brighter future for every learner</p>
                    </header>
                    <section className="user-testimonial">
                        <div className="image-container" style={{ width: '2500px' }}>
                            <img src={childCompImg} alt="child using computer" className="rotatable-image" />
                        </div>
                        <blockquote>
                            <p>
                                Educational resources tailored for children should engage each age group with age-appropriate and interactive content. For the youngest learners, vibrant games and animated stories can introduce the alphabet and basic numbers, cultivating early literacy and numeracy skills.</p>
                            <footer>—Team Childguard</footer>
                        </blockquote>
                    </section>
                    <button className="read-story-btn" onClick={handleSeeAllCategories}>See All Categories</button>
                </div></div><br /><br />
            <Box sx={{ flexGrow: 1 }}></Box>
            <div id="category-section">
                {/* <AppBar position="static" sx={{ backgroundColor: '#262220' }}> */}
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontSize: '30px', color: 'Black' }}>
                        CATEGORIES
                    </Typography>
                    <Search>
                        <StyledInputBase
                            placeholder="Search by title or content..."
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleSearchChange}
                            sx={{ backgroundColor: 'whitesmoke', color: 'black', width: '19vw', borderRadius: '10px' }}


                        />
                    </Search>
                </Toolbar>
                {/* </AppBar> */}
            </div>
            <Grid container spacing={2} sx={{ p: 3 }}>
                {categories.map((category) => (
                    // <Grid item xs={12} sm={6} md={3} key={category}>
                    <Grid item
                        xs={12}
                        sm={expandedCategory === category ? 12 : 6}  // Conditionally change grid size
                        md={expandedCategory === category ? 12 : 3}  // Same here
                        key={category}>
                        <Card raised sx={{
                            width: '100%',
                            height: expandedCategory === category ? '100%' : '250px', // Adjust height as needed
                            backgroundImage: `url(${categoryImages[category] || '../assets/Learn English.webp'})`, // Use default image if not found, // Use default image if not found
                            backgroundSize: 'cover', // Cover the entire area of the card
                            backgroundPosition: 'center', // Center the background image
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end', // Adjust content to the bottom
                            color: 'white', // Ensure text is readable over image
                            boxShadow: 'inset 0 0 0 2000px rgba(0,0,0,0.5)' // Optional: darken the image slightly
                        }}>
                            <CardActionArea onClick={() => setExpandedCategory(expandedCategory === category && groupedResources[category]?.length > 0 ? null : category)}>
                                {/* <CardMedia
                                    component="img"
                                    height="140"
                                    image={categoryImages[category] || '../assets/EduReslearning.jpeg'}  // Default image if no specific one found
                                    alt={category}
                                /> */}
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {category}
                                    </Typography>
                                    {groupedResources[category]?.length > 0 ? (
                                        <Typography variant="body2" color="white">
                                            {groupedResources[category]?.length} resources available
                                        </Typography>
                                    ) : (<Typography variant="body2" color="white">
                                        0 resources available
                                    </Typography>)}

                                </CardContent>
                            </CardActionArea>
                            {expandedCategory === category && groupedResources[category]?.length > 0 && (
                                <Grid container spacing={1} sx={{ p: 2 }}>
                                    {groupedResources[category].map((resource, index) => (
                                        <Grid item xs={12} sm={6} md={3} key={index}>
                                            <AnimatedCard {...resource} />
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default EducationalResourcePage;

