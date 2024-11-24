import project from '../models/project.js';
 

export const search = async (params = {}) => {
    const getProjects = await project.find(params).exec();
    return getProjects;
}
 
export const post = async (u) => {
    const postProject = new project(u);
    return postProject.save();
}
 
export const get = async (id) => {
    const getId = await project.findById(id).exec();
    return getId;
}
 
export const getMultiple = async (ids) => {
    const projects = await project.find({
        '_id': {
            $in: ids
        }
    }).exec();
    return projects;
}
 
export const del = async (id) => {
    const delProject = await project.findByIdAndDelete(id).exec();
    console.log(delProject);
    return delProject;
}
 

export const update = async (id, data) => {
    const updateProject = await project.findByIdAndUpdate(id, data).exec();
    return updateProject;
}
 
export const find = async (key) => {
    console.log(':::servicefile -' + key);
    const findResource = await project.find(key).exec();
    console.log(':::servicefile -' + findResource);
    return findResource;
}
