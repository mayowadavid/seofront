import utils from '~~/utils/helper';

const { Axios, AwnNotify } = utils;
export const useStore = () => useState('auth', () => ({
    user: {},
    token: null,
    role: null,
    projectId: null,
    planId: null,
    plan: [],
    projects: [],
    categories: [],
    information: [],
    groups: [],
    tasks: [],
    singlePlan: {},
    singleProject: {},
    singleCategory: {},
    singleTask: {},
    singleInformation: {},
    singleGroup: {},
}));

let {value} = useStore();

export const getters = {
    user:  value.user,
    role: value.role,
    token: value.token,
    projectId: value.projectId,
    planId: value.planId,
    categories: value.categories,
    information: value.information,
    groups: value.groups,
    tasks: value.tasks,
};


const SET_TOKEN = (token: any) => {
    value.token = token
};

const SET_Role = (role: any) => {
    value.role = role
};

const SET_PLAN = (plan: []) => {
    value.plan = plan;
};

const SET_PROJECT = (project: []) => {
    value.projects = project;
};

const SET_Category = (category: []) => {
    value.categories = category;
};

const SET_Task = (task: []) => {
    value.tasks = task;
};

const SET_Information = (information: []) => {
    value.information = information;
};

const SET_Group = (groups: []) => {
    value.groups = groups;
};

const SET_Singleplan = (plan: {}) => {
    value.singlePlan = plan;
};

const SET_SingleProject = (project: {}) => {
    value.singleProject = project;
};

const SET_Single_Category = (category: {}) => {
    value.singleCategory = category;
};

const SET_Single_Task = (task: {}) => {
    value.singleTask = task;
};

const SET_Single_Information = (information: {}) => {
    value.singleInformation = information;
};

const SET_Single_Group = (group: {}) => {
    value.singleGroup = group;
};

export const SET_PROJECT_ID = (projectId: any) => {
    value.projectId = projectId;
};

const SET_USER = (user: object) => {
        value.user = {...user};
};

const LOGOUT = () => {
        value.token = null;
        value.user = {};
        value.role = null;
}


export const actions  = {
    async login(data: object){
        try {
            const res = await Axios('post',`users/login`, data);
            const {refreshToken} = res?.data;
            SET_USER(res?.data);
            SET_TOKEN(refreshToken);
            localStorage.setItem('token', refreshToken);
            navigateTo('/dashboard');
        } catch(e){
            //console.log(e);
        }
    },
    async signUp(form: {}){
        try{
            const res = await Axios('post', `users/create`, form);
            AwnNotify('user created', 'success');
            navigateTo("/users");
            return res?.data;
        }catch(e){
            AwnNotify('failed to create', 'alert');
        }
    },
    async refreshToken(){
        try{
            //console.log('iran');
            const res = await Axios('get', 'users/fetchUser');
            const {refreshToken, role} = res?.data;
            //console.log('state',   res?.data);
            SET_USER(res?.data);
            SET_TOKEN(refreshToken);
            SET_Role(role);
            localStorage.setItem('token', refreshToken);
        }catch(e){

        }
    },
    async fetchUser(id: string){
        try{
            const res = await Axios('get', `users/${id}`);
            return res?.data;
        }catch(e){

        }
    },
    async updateUserData(id: string, form: []){
        try{
            const res = await Axios('patch', `users/${id}`, form);
            AwnNotify('user updated', 'success');
            navigateTo("/users");
            return res?.data;
        }catch(e){

        }
    },
    async deleteUser(id: string){
        try{
            const res = await Axios('delete', `users/${id}`);
            AwnNotify('user deleted', 'success');
            return res?.data;
        }catch(e){
            AwnNotify('failed to delete', 'alert');
        }
    },
    async allUsers(){
        try{
            //console.log('iran');
            const res = await Axios('get', 'users');
            return res?.data;
        }catch(e){

        }
    },
    async createPlan(form: {}){
        try{
            const res = await Axios('post', `plan/create`, form);
            AwnNotify('Plan created', 'success');
            navigateTo("/accounts");
            return res?.data;
        }catch(e){
            AwnNotify('failed to create', 'alert');
        }
    },
    async createProjects(form: {}){
        try{
            const res = await Axios('post', `projects/create`, form);
            AwnNotify('Plan created', 'success');
            navigateTo("/projects");
            return res?.data;
        }catch(e){
            AwnNotify('failed to create', 'alert');
        }
    },
    async fetchSinglePlan(id: string){
        try{
            const res = await Axios('get', `plan/${id}`);
            console.log(res?.data)
            SET_Singleplan(res?.data);
        }catch(e){

        }
    },
    async updatePlan(id: string, form: {}){
        try{
            const res = await Axios('patch', `plan/${id}`, form);
            console.log('created', res?.data);
            AwnNotify('plan Updated', 'success')
            navigateTo("/accounts");
            return res?.data;
        }catch(e){
            AwnNotify('Category failed to update', 'alert');
        }
    },
    async deletePlan(id: string){
        try{
            const res = await Axios('delete', `plan/${id}`);
            AwnNotify('Plan deleted', 'success');
            return res?.data;
        }catch(e){
            AwnNotify('failed to create', 'alert');
        }
    },
    async fetchPlan(){
        const res = await Axios('get', 'plan');
        res?.data?.length > 0 && SET_PLAN(res?.data);
       console.log('plan', res?.data);
        const id = res?.data?.length > 0 && res?.data[0]?.id || '';
        id && actions.fetchProject(id);
        if(res?.data){
            return res?.data;
        }
    },
    async fetchProject(id: string){
        const {fetchTaskByProject, fetchGroupsByProject, fetchCategories, fetchInformationByProject} = actions;
        try{
            const planId =  id;
            const res = await Axios('get', `projects/${planId}`);
            SET_PROJECT(res?.data);
            console.log(res?.data);
            const projectId = res?.data[0]?.id;
            SET_PROJECT_ID(res?.data[0]?.id)
            Promise.all([
                fetchTaskByProject(projectId), 
                fetchGroupsByProject(projectId), 
                fetchCategories(projectId), 
                fetchInformationByProject(projectId)]);
        }catch(e){

        }
    },
    async fetchCategories(id: string){
        try{
            const projectId =  id;
            const res = await Axios('get', `category-items/categoryByProject/${projectId}`);
            SET_Category(res?.data)
        }catch(e){

        }
    },
    async checkValidUrl(id: string){
        try{
            const res = await Axios('get', `category-items/findUrl/${id}`);
            return res?.data;
        }catch(e){

        }
    },
    async createCategory(form: {}){
        try{
            const res = await Axios('post', `category-items/create`, form);
            console.log('created', res?.data);
            AwnNotify('Category created', 'success')
            return res?.data;
        }catch(e){
            AwnNotify('Category failed to create', 'alert');
        }
    },
    async updateCategory(id: string, form: {}){
        try{
            const res = await Axios('patch', `category-items/${id}`, form);
            console.log('created', res?.data);
            AwnNotify('Category Updated', 'success')
            navigateTo("/category-items");
            return res?.data;
        }catch(e){
            AwnNotify('Category failed to update', 'alert');
        }
    },
    async fetchOneCategories(id: string){
        try{
            const res = await Axios('get', `category-items/${id}`);
            SET_Single_Category(res?.data);
        }catch(e){

        }
    },
    async fetchInformationByProject(id: string){
        try{
            const projectId =  id;
            const res = await Axios('get', `information-item/informationByProjects/${projectId}`);
            SET_Information(res?.data)
        }catch(e){

        }
    },
    async fetchInformation(id: string){
        try{
            const res = await Axios('get', `information-item/${id}`);
            SET_Single_Information(res?.data)
        }catch(e){

        }
    },
    async createInformation(form: {}){
        try{
            const res = await Axios('post', `information-item/create`, form);
            AwnNotify('Information created', 'success')
            navigateTo("/information-items");
            return res?.data;
        }catch(e){
            AwnNotify('failed', 'alert');
        }
    },
    async updateInformation(id: string, form: {}){
        try{
            const res = await Axios('patch', `information-item/${id}`, form);
            AwnNotify('Information updated', 'success')
            navigateTo("/information-items");
            return res?.data;
        }catch(e){
            AwnNotify('failed', 'alert');
        }
    },
    async fetchTask(id: string){
        try{
            const res = await Axios('get', `task/${id}`);
            console.log('task', res?.data);
            SET_Single_Task(res?.data)
        }catch(e){

        }
    },
    async fetchTaskByProject(id: string){
        try{
            const projectId =  id;
            const res = await Axios('get', `task/taskByProjects/${projectId}`);
            SET_Task(res?.data)
        }catch(e){

        }
    },
    async createTask(form: {}){
        try{
            const res = await Axios('post', `task/create`, form);
            AwnNotify('Task created', 'success')
            SET_Single_Task(res?.data);
            return res?.data;
        }catch(e){
            AwnNotify('failed', 'alert');
        }
    },
    async updateTasks(id: string, form: {}){
        try{
            const res = await Axios('patch', `task/${id}`, form);
            AwnNotify('Task updated', 'success')
            navigateTo("/tasks");
            return res?.data;
        }catch(e){
            AwnNotify('failed', 'alert');
        }
    },
    async deleteTasks(id: string){
        try{
            const res = await Axios('delete', `task/${id}`);
            AwnNotify('Task deleted', 'success')
            navigateTo("/tasks");
            return res?.data;
        }catch(e){
            AwnNotify('failed', 'alert');
        }
    },
    async fetchGroupsByProject(id: string){
        try{
            const projectId =  id;
            const res = await Axios('get', `groups/userGroups/${projectId}`);
            SET_Group(res?.data)
        }catch(e){

        }
    },
    async fetchGroups(id: string){
        try{
            const res = await Axios('get', `groups/${id}`);
            SET_Single_Group(res?.data)
        }catch(e){

        }
    },
    async createGroups(form: {}){
        try{
            const res = await Axios('post', `groups/create`, form);
            AwnNotify('Group created', 'success')
            navigateTo("/user-groups");
            return res?.data;
        }catch(e){
            AwnNotify('failed', 'alert');
        }
    },
    async updateGroups(id: string, form: {}){
        try{
            const res = await Axios('patch', `groups/${id}`, form);
            AwnNotify('Group updated', 'success')
            navigateTo("/user-groups");
            return res?.data;
        }catch(e){
            AwnNotify('failed', 'alert');
        }
    },
     async createTrackUrl(form: {}){
        try{
            const res = await Axios('post', `tracking-url/create`, form);
            AwnNotify('Track url created', 'success')
            console.log(res?.data);
            return res?.data;
        }catch(e){
            AwnNotify('failed', 'alert');
        }
    },
    async fetchTrackUrls(){
        try{
            const res = await Axios('get', `tracking-url`);
            return res?.data;
        }catch(e){

        }
    },
    async fetchClickList(){
        try{
            const res = await Axios('get', `click-data`);
            return res?.data;
        }catch(e){

        }
    },
    async fetchClicklistByTrackUrl(id: string){
        try{
            const res = await Axios('get', `click-data/trackUrlClick/${id}`);
            return res?.data;
        }catch(e){

        }
    },
    async deleteTrackUrClick(id: string){
        try{
            const res = await Axios('delete', `click-data/${id}`);
            AwnNotify('Track url deleted', 'success')
            return res?.data;
        }catch(e){
            AwnNotify('failed', 'alert');
        }
    },
    async fetchTrackUrlOne(id: string){
        try{
            const res = await Axios('get', `tracking-url/${id}`);
            return res?.data;
        }catch(e){

        }
    },
    async updateTrackUrl(id: string, form: {}){
        try{
            const res = await Axios('patch', `tracking-url/${id}`, form);
            AwnNotify('Track url updated', 'success')
            navigateTo("/tracking-url");
            return res?.data;
        }catch(e){
            AwnNotify('failed', 'alert');
        }
    },
    async deleteTrackUrl(id: string){
        try{
            const res = await Axios('delete', `tracking-url/${id}`);
            AwnNotify('Track url deleted', 'success')
            return res?.data;
        }catch(e){
            AwnNotify('failed', 'alert');
        }
    },
}

// export {actions, mutations, getters}