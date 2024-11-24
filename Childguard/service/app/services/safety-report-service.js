import safetyReport from '../models/safety-report.js';


export const search = async (params = {}) => {
    const getReport = await safetyReport.find(params).exec();
    return getReport;
}

export const post = async (u) => {
    const postReport = new safetyReport(u);
    return postReport.save();
}


export const get = async (id) => {
    const getId = await safetyReport.findById(id).exec();
    return getId;
}

export const del = async (id) => {
    const delReport = await safetyReport.findByIdAndDelete(id).exec();
    console.log(delReport);
    return delReport;
}

export const update = async (id, data) => {
    const updateReport = await safetyReport.findByIdAndUpdate(id, data).exec();
    return updateReport;
}

export const find = async (key) => {
    console.log(':::servicefile -' + key);
    const findResource = await safetyReport.find(key).exec();
    console.log(':::servicefile -' + findResource);
    return findResource;
}