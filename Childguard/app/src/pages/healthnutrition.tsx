import { useState, useEffect } from 'react';
import { Toolbar, Typography, TextField, Card, CardContent, CardActions, IconButton, Grid, Box, Button } from '@mui/material';
import { Download, LocalHospital, HealthAndSafety, MedicationLiquid, NoFood, Bloodtype, Coronavirus } from '@mui/icons-material';
import { Search as SearchIcon } from '@mui/icons-material';
import exampleImage from '../images/nutrition.jpeg';  // Importing the image
import exampleImage2 from '../images/eatright.png';  // Importing the image
import { getHealthResource } from '../services/healthResources-service';
import { HealthResource } from '../models/HealthResource';




const icons = [<LocalHospital />, <HealthAndSafety />, <MedicationLiquid />, <NoFood />, <Bloodtype />, <Coronavirus />]; // List of icons
function Health() {
    const [searchQuery, setSearchQuery] = useState('');
    const [solutions, setSolutions] = useState<HealthResource[]>([]);
    // const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getSolutions = async () => {
            try {
                // setLoading(true); // Uncomment this if you have a loading state to set
                const data = await getHealthResource();
                setSolutions(data);
                // setLoading(false); // Set loading to false here if applicable
            } catch (error) {
                console.error('Error fetching data: ', error);
                // setLoading(false); // Make sure to handle loading state in case of error
            }
        };

        getSolutions();
    }, []); // This effect should run once on mount or when certain conditions require re-fetching

    // Effect for filtering data
    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filteredData = solutions.filter(solution =>
            solution.title.toLowerCase().includes(lowercasedQuery) ||
            solution.content.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredSolutions(filteredData);
    }, [searchQuery, solutions]);
    const [filteredSolutions, setFilteredSolutions] = useState(solutions);
    // const [isAppBarFixed, setIsAppBarFixed] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.pageYOffset > 0) {
    //             setIsAppBarFixed(true);
    //         } else {
    //             setIsAppBarFixed(false);
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);
    const handleNavigate = (url: string) => {
        window.open(url, '_blank');
    };
    const handleDownload = (pdf: string): void => {
        // Process.env.PUBLIC_URL gives you the path to your public folder
        const link = document.createElement('a');
        link.href = `http://localhost:3002/health/${pdf}`;
        link.setAttribute('download', pdf); // Suggests the name for the downloaded file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Remove the link when done
    };
    const getRandomIcon = () => {
        const randomIndex = Math.floor(Math.random() * icons.length);
        return icons[randomIndex];
    };
    // const cardColors = [
    //     '#f5f5f5', // White smoke
    //     '#e3e3ef'
    // ];
    return (
        <>
            <div style={{ backgroundColor: '#f3f3fb' }}>


                <div style={{
                    backgroundImage: `url('http://localhost:3002/images/food.jpeg')`, // Replace 'background-image.jpg' with the actual image filename
                    backgroundSize: 'cover',
                    height: '400px',
                    backgroundPosition: 'center',
                    padding: '20px',
                    textAlign: 'left',
                    color: 'Black',
                    display: 'flex',
                    flexDirection: 'column',
                }} >
                    <div style={{ maxWidth: '60%', marginRight: '20px' }}>
                        <h2 style={{ fontSize: '44px', marginBottom: '50px', fontFamily: "'Oswald', sans-serif" }}>Welcome to our Health and Nutrition Guide</h2>
                        <p style={{ fontSize: '20px', marginBottom: '20px' }}>
                            Here you'll find valuable information to help you lead a healthier lifestyle.
                            Whether you're looking to improve your diet, increase your fitness level, or simply learn more about maintaining your well-being,
                            our guide has something for everyone. Explore our articles, tips, and resources to discover how you can make positive changes
                            for your health and vitality.
                        </p>
                        <p style={{ fontSize: '20px', marginBottom: '20px' }}>
                            From nutritious recipes to workout routines, from stress management techniques to sleep hygiene tips, we've got you covered.
                            Empower yourself with knowledge and take control of your health journey today!
                        </p>
                    </div>
                </div>
                <Toolbar style={{ justifyContent: 'space-between' }} >
                    <Typography variant="h6" noWrap style={{ color: 'transparent' }}>
                        Health and Nutrition Resources
                    </Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        InputProps={{
                            endAdornment: <SearchIcon style={{ color: 'white' }}
                            />, style: { color: 'black' }
                        }}
                    />
                </Toolbar>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '20px',

                    paddingBottom: '50px',
                    marginLeft: '15px'
                }}>

                    {filteredSolutions.map((solution, index) => (
                        <Card key={index} sx={{
                            position: 'relative', width: 'calc(20% - 20px)',
                            height: '250px',
                            // backgroundColor: cardColors[index % cardColors.length],
                            transition: 'transform 0.3s ease-in-out',

                            '&:hover': {
                                transform: 'scale(1.15)' // Increase size on hover
                            }
                        }}>
                            <CardContent sx={{
                                color: 'darkslategrey',
                                backgroundColor: 'whitesmoke' // Specific background color for the description
                            }} >

                                <Typography variant="h5" component="div" sx={{ paddingBottom: '40px', }}>
                                    {solution.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'darkslategrey' }}>
                                    {solution.content}
                                </Typography>
                            </CardContent>
                            <CardActions style={{ position: 'absolute', bottom: 8, left: 0, right: 0, justifyContent: 'center' }}>
                                <IconButton aria-label="health" sx={{ position: 'absolute', bottom: 1, right: 10 }}>
                                    {getRandomIcon()}
                                </IconButton>
                                <Button size="small" sx={{ position: 'absolute', bottom: 2, left: 10, color: '#5058c0' }} onClick={() => handleDownload(solution.pdf)} startIcon={<Download />}>
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </div>
                <Grid container spacing={1} sx={{ position: 'relative' }}>
                    <Grid item xs={10} md={7}>
                        <Box
                            component="img"
                            sx={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50px'
                            }}
                            alt="Descriptive Alt Text"
                            src={exampleImage}  // Using the imported image
                        />
                    </Grid>

                    <Grid item xs={12} md={5} sx={{ position: 'relative', top: '100px' }}>
                        <Typography variant="h5" component="h2" gutterBottom
                            sx={{
                                fontSize: "xxx-large", fontFamily: "'Bebas Neue', sans-serif",
                                fontWeight: 400,
                                fontStyle: 'normal',
                                marginLeft: '30px'
                            }}>
                            Nutrition Tips for Kids
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: 'large', marginLeft: '30px', fontFamily: "'Oswald', sans-serif", fontWeight: 'light' }}>
                            Many children and families today have busy schedules. These make it hard to sit down to homemade meals every day. Many kids’ diets involve a lot of convenience and takeout food. But these foods can be unhealthy. They can have a negative effect on your child’s health. Some of the problems unhealthy eating causes can continue into adulthood. They can even develop into lifelong diseases.
                        </Typography>
                        <Grid container spacing={2} direction="column" sx={{ marginTop: '10px', marginLeft: '16px' }}>
                            <Grid item>
                                <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Oswald', sans-serif" }}>
                                    Global Resources About Nutrition
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container spacing={2}>
                                    <Grid item sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: 'light' }} >
                                        <Button sx={{ backgroundColor: '#574849', '&:hover': { backgroundColor: '#125d34' } }} variant="contained" color="info" onClick={() => handleNavigate('https://www.nutrition.gov/')}>
                                            Resource 1
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" sx={{ backgroundColor: '#574849', '&:hover': { backgroundColor: '#125d34' } }} onClick={() => handleNavigate('https://www.cdc.gov/healthyschools/nutrition/facts.htm')}>
                                            Resource 2
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" sx={{ backgroundColor: '#574849', '&:hover': { backgroundColor: '#125d34' } }} onClick={() => handleNavigate('https://www.hsph.harvard.edu/nutritionsource/kids-healthy-eating-plate/')}>
                                            Resource 3
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} sx={{ position: 'relative', right: '45%', top: '-90%' }}>
                            <Box
                                component="img"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block'
                                }}
                                alt="Second Image"
                                src={exampleImage2}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ width: '100%' }}>
                            <footer className="footer" >
                                <Typography variant="body1">© 2024 Health Guide</Typography>
                                <Typography variant="body2">All rights reserved.</Typography>
                            </footer>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default Health;
