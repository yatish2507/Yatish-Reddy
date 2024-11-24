import React, { useEffect, useState } from 'react';
import { fetchSafetyReports, updateSafetyReport, deleteSafetyReport } from '../services/adminDashboard-service';
import { Card, CardContent, CardActions, Button, TextField, Snackbar, Switch, Typography, Grid, Box, Paper, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Alert from '@mui/material/Alert';
import { SafetyReport } from '../models/SafetyReport';

const formatDate = (dateString: string | Date): string => {
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
};

const SafetyReports = () => {
    const [reports, setReports] = useState<SafetyReport[]>([]);
    const [editReportID, setEditReportID] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<SafetyReport | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [validationError, setValidationError] = useState(false);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const initFetch = async () => {
            try {
                const data = await fetchSafetyReports();
                setReports(data);
            } catch (error) {
                console.error('Failed to fetch safety reports:', error);
            }
        };
        initFetch();
    }, []);

    const handleEditClick = (report: SafetyReport) => {
        setEditReportID(report.id as string);
        setEditFormData({
            ...report,
            comments: report.comments ?? ''  // Ensure comments are initialized
        });
    };

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditFormData({
            ...editFormData!,
            [name]: value
        });

        // Check if comments are required and valid
        if (name === 'comments' && editFormData!.isCompleted) {
            setValidationError(value.trim().length === 0);
        }
    };

    const handleStatusChange = (checked: boolean) => {
        const commentsValue = editFormData!.comments ?? '';  // Use nullish coalescing for safety
        if (checked && commentsValue.trim() === '') {
            setValidationError(true);
        } else {
            setValidationError(false);
        }
        setEditFormData({
            ...editFormData!,
            isCompleted: checked,
            comments: commentsValue
        });
    };

    const handleSave = async () => {
        if (editReportID && editFormData && (!editFormData.isCompleted || editFormData.comments?.trim() !== '')) {
            try {
                await updateSafetyReport(editReportID, editFormData);
                setOpenSnackbar(true);
                setSnackbarMessage('Safety report successfully updated!');
                const updatedReports = reports.map(report =>
                    report.id === editReportID ? { ...editFormData } : report
                );
                setReports(updatedReports);
                setEditReportID(null);
                setEditFormData(null);
                setValidationError(false);
            } catch (error) {
                console.error('Failed to update safety report:', error);
                setSnackbarMessage('Failed to update safety report');
                setOpenSnackbar(true);
            }
        } else {
            setValidationError(true);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteSafetyReport(id);
            setReports(reports.filter(report => report.id !== id));
        } catch (error) {
            console.error('Failed to delete safety report:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };

    const filteredReports = reports.filter(report => {
        return filter === 'all' || (filter === 'completed' && report.isCompleted) || (filter === 'open' && !report.isCompleted);
    });

    return (
        <>
            <FormControl component="fieldset">
                <RadioGroup row aria-label="filter" name="filter" value={filter} onChange={handleFilterChange}>
                    <FormControlLabel value="all" control={<Radio />} label="All" />
                    <FormControlLabel value="completed" control={<Radio />} label="Completed" />
                    <FormControlLabel value="open" control={<Radio />} label="Open" />
                </RadioGroup>
            </FormControl>
            <Grid container spacing={2}>
                {filteredReports.map(report => (
                    <Grid item xs={12} key={report.id}>
                        <Paper elevation={3} sx={{ margin: 2 }}>
                            <Card raised>
                                <CardContent>
                                    {editReportID === report.id ? (
                                        <Box>
                                            <TextField fullWidth margin="normal" label="Title" name="title" value={editFormData!.title} onChange={handleFormChange} />
                                            <TextField fullWidth margin="normal" multiline label="Description" name="description" value={editFormData!.description} onChange={handleFormChange} />
                                            <TextField fullWidth margin="normal" label="Address" name="address" value={editFormData!.address} onChange={handleFormChange} />
                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                value={`${report.city}, ${report.state}`}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                label="City and State" name="City and State"
                                            />

                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                value={formatDate(report.reportDate as Date)}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                variant="outlined"
                                                label="CreatedDate" name="CreatedDate"
                                            />
                                            <FormControlLabel
                                                label="Status"
                                                control={
                                                    <Switch checked={editFormData!.isCompleted} onChange={(e, checked) => handleStatusChange(checked)} />
                                                }
                                            />
                                            <TextField fullWidth margin="normal" required label="Comments" name="comments" value={editFormData!.comments ?? ''} onChange={handleFormChange} error={validationError && editFormData!.isCompleted} helperText={validationError && editFormData!.isCompleted ? "Comments are required" : ""} />
                                        </Box>
                                    ) : (
                                        <Box>
                                            <Typography variant="h6" gutterBottom><b>{report.title}</b></Typography>
                                            <Typography><b>Content:</b> {report.description}</Typography><br />
                                            <Typography><b>Address:</b> {report.address}</Typography>
                                            <Typography><b>City:</b> {report.city} <b>State:</b> {report.state}</Typography>
                                            <Typography><b>CreatedDate:</b> {formatDate(report.reportDate as Date)}</Typography>
                                            <Typography><b>Status:</b> {report.isCompleted ? "Closed" : "Open"}</Typography>
                                            <Typography><b>Closing Comments:</b> {report.comments}</Typography>
                                        </Box>
                                    )}
                                </CardContent>
                                <CardActions>
                                    {editReportID === report.id ? (
                                        <Button onClick={handleSave} disabled={validationError}>Save</Button>
                                    ) : (
                                        <>
                                            <Button onClick={() => handleEditClick(report)}>Edit</Button>
                                            <Button onClick={() => handleDelete(report.id as string)}>Delete</Button>
                                        </>
                                    )}
                                </CardActions>
                            </Card>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default SafetyReports;
