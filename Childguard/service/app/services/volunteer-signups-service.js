import volunteerSignups from '../models/volunteer-signup.js';

export const search = async (params = {}) => {
    const getVolunteer = await volunteerSignups.find(params).exec();
    return getVolunteer;
}

export const post = async (u) => {
    const postVolunteer = new volunteerSignups({
        userId: u.projectData.userId,
        projectId: u.projectData.projectId,
        status: u.projectData.status
    });
    return postVolunteer.save();
}

export const get = async (id) => {
    const getId = await volunteerSignups.findById(id).exec();
    return getId;
}

export const del = async (id) => {
    const delVolunteer = await volunteerSignups.findByIdAndDelete(id).exec();
    console.log(delVolunteer);
    return delVolunteer;
}


export const update = async (id, data) => {
    const updateVolunteer = await volunteerSignups.findByIdAndUpdate(id, data).exec();
    return updateVolunteer;
}

export const find = async (key) => {
    console.log(':::servicefile -' + key);
    const findResource = await volunteerSignups.find(key).exec();
    console.log(':::servicefile -' + findResource);
    return findResource;
}
