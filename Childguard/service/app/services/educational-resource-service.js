import educationalResource from '../models/educational-resource.js';

export const search = async (params = {}) => {
    const getResources = await educationalResource.find(params).exec();
    return getResources;
}

export const post = async (u) => {
    const postResource = new educationalResource(u);
    return postResource.save();
}

export const get = async (id) => {
    const getId = await educationalResource.findById(id).exec();
    return getId;
}

export const del = async (id) => {
    const delResource = await educationalResource.findByIdAndDelete(id).exec();
    console.log(delResource);
    return delResource;
}

export const update = async (id, data) => {
    const updateResource = await educationalResource.findByIdAndUpdate(id, data).exec();
    return updateResource;
}

export const find = async (key) => {
    console.log(':::servicefile -' + key);
    const findResource = await educationalResource.find(key).exec();
    console.log(':::servicefile -' + findResource);
    return findResource;
}