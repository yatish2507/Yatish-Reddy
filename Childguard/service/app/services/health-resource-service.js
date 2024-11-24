import healthResource from '../models/health-resource.js';


export const search = async (params = {}) => {
    const getResources = await healthResource.find(params).exec();
    return getResources;
}

export const post = async (u) => {
    const postResource = new healthResource(u);
    return postResource.save();
}


export const get = async (id) => {
    const getId = await healthResource.findById(id).exec();
    return getId;
}

export const del = async (id) => {
    const delResource = await healthResource.findByIdAndDelete(id).exec();
    console.log(delResource);
    return delResource;
}


export const update = async (id, data) => {
    const updateResource = await healthResource.findByIdAndUpdate(id, data).exec();
    return updateResource;
}

export const find = async (key) => {
    console.log(':::servicefile -' + key);
    const findResource = await healthResource.find(key).exec();
    console.log(':::servicefile -' + findResource);
    return findResource;
}