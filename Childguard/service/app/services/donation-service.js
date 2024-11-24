import donate from '../models/donation.js';

export const search = async (params = {}) => {
    const getDonates = await donate.find(params).exec();
    return getDonates;
}

export const post = async (don) => {
    const postDonates = new donate(don);
    return postDonates.save();
}

export const get = async (id) => {
    const getDonate= await donate.findById(id).exec();
    return getDonate;
}

export const del = async (id) => {
    const delDonate = await donate.findByIdAndDelete(id).exec();
    console.log(delDonate);
    return delDonate;
}

export const update = async (id, data) => {
    const updateDonate = await donate.findByIdAndUpdate(id, data).exec();
    return updateDonate;
}


export const find = async (key) => {
    console.log(':::servicefile -' + key);
    const donateFind = await donate.find(key).exec();
    console.log(':::servicefile -' + donateFind);
    return donateFind;
}