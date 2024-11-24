// src/pages/Projects.tsx
import React, { useEffect, useState } from 'react';
import { fetchProjects, updateProject, deleteProject } from '../services/adminDashboard-service';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, Snackbar, Switch, Typography, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Project } from '../models/Project';

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [editProjectID, setEditProjectID] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<{ title: string; description: string; status: boolean }>({ title: '', description: '', status: true });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const initFetch = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            }
        };
        initFetch();
    }, []);

    const handleEditClick = (project: Project) => {
        setEditProjectID(project.id);
        setEditFormData({ title: project.title, description: project.description, status: project.isCompleted });
        setOpenDialog(true);
    };

    const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditFormData({ ...editFormData, status: event.target.checked });
    };

    const handleEditFormSave = async () => {
        if (editProjectID) {
            try {
                await updateProject(editProjectID, {
                    title: editFormData.title,
                    description: editFormData.description,
                    isCompleted: editFormData.status
                });

                setOpenSnackbar(true);

                const updatedProjects = projects.map(project =>
                    project.id === editProjectID ? { ...project, ...editFormData, isCompleted: editFormData.status } : project
                );
                setProjects(updatedProjects);
                setEditProjectID(null);
                setOpenDialog(false);
            } catch (error) {
                console.error('Failed to update project:', error);
            }
        }
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setEditProjectID(null);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteProject(id);
            setProjects(projects.filter(project => project.id !== id));
        } catch (error) {
            console.error('Failed to delete project:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map(project => (
                        <TableRow key={project.id}>
                            <TableCell>{project.title}</TableCell>
                            <TableCell>{project.description}</TableCell>
                            <TableCell><Typography>{project.isCompleted ? "Closed" : "Open"}</Typography></TableCell>
                            <TableCell>
                                <Button onClick={() => handleEditClick(project)}>Edit</Button>
                                <Button onClick={() => handleDelete(project.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={openDialog} onClose={handleDialogClose} sx={{ '& .MuiDialog-paper': { minWidth: '600px' } }}>
                <DialogTitle>Edit Project</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        name="title"
                        value={editFormData.title}
                        onChange={handleEditFormChange}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        variant="standard"
                        name="description"
                        value={editFormData.description}
                        onChange={handleEditFormChange}
                    />
                    <FormControlLabel
                        control={<Switch checked={editFormData.status} onChange={handleStatusChange} />}
                        label={editFormData.status ? "Closed" : "Open"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditFormSave}>Save</Button>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Project successfully updated!
                </Alert>
            </Snackbar>
        </>
    );
};

export default Projects;
